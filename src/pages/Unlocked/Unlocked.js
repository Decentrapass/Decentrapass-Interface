import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import DataDisplay from "./DataDisplay/DataDisplay";
import Recommended from "./Recommended/Recommended";
import Nav from "../../components/Nav/Nav";
import { getCookie } from "../../functions/cookies";
import {
  addItem,
  changeAccount,
  changeItem,
  loading,
  saveContract,
  saveItems,
  saveLogin,
  savePassword,
  saveWeb3,
} from "../../state/actions";
import { decrypt } from "../../functions/encryption";
import { formatData } from "../../functions/format";
import { checkExtensionReq } from "../../functions/extensionInteractions";

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
    contract: state.contract,
    account: state.account,
    password: state.password,
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveItems: (data) => dispatch(saveItems(data)),
    changeItem: (item) => dispatch(changeItem(item)),
    saveLogin: (page) => dispatch(saveLogin(page)),
    loading: (bool) => dispatch(loading(bool)),
    savePassword: (pass) => dispatch(savePassword(pass)),
    changeAccount: (acc) => dispatch(changeAccount(acc)),
    saveWeb3: (web3item) => dispatch(saveWeb3(web3item)),
    saveContract: (Contract) => dispatch(saveContract(Contract)),
    addItem: (item) => dispatch(addItem(item)),
  };
};

class Unlocked extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      showRec: true, // Handles view on mobile
      showData: true, // Handles view on mobile
      contract: null, // Saves contract to update only on change,
      extensionDeleteReq: false, // Handles a delete req from the ext
    };

    this.changeView = this.changeView.bind(this);
    this.handleExtensionQueries = this.handleExtensionQueries.bind(this);
  }

  async componentDidUpdate() {
    // Only allow this page if logged in
    if (
      !this.props.loggedIn &&
      getCookie("SESSION").length > 0 &&
      !this.state.contract &&
      this.props.contract
    ) {
      // If cookie exists and they go to /unlocked
      this.props.loading(true);

      this.setState({ contract: this.props.contract });

      // Stored hashed password in local storage
      let passLS = getCookie("SESSION").split(",")[1];

      // If the cookie has the wrong password we delete the session
      let numItems = await this.props.contract.methods
        .numObjects(this.props.account)
        .call();

      let dataToSave = await formatData(
        numItems,
        this.props.contract.methods,
        this.props.account
      );

      // Decrypt contract data
      dataToSave = decrypt(dataToSave, passLS);

      // Save all data to state
      this.props.saveItems(dataToSave);
      this.props.changeItem(dataToSave[0]);
      this.props.saveLogin(true);
      this.props.loading(false);
      this.props.savePassword(passLS);

      // Handle extension queries
      let query = checkExtensionReq();
      if (query) this.handleExtensionQueries(query);

      this.props.loading(false);
    }
  }

  handleExtensionQueries(query) {
    switch (query["action"]) {
      case "add":
        this.props.addItem(query["type"]);
        this.setState({ redirect: <Redirect to="/unlocked/add" /> });
        break;
      case "edit":
        for (let i = 0; i < this.props.items.length; i++)
          if (this.props.items[i].id == query["id"]) {
            this.props.changeItem(this.props.items[i]);
            this.setState({ redirect: <Redirect to="/unlocked/edit" /> });
            break;
          }
        break;
      case "delete":
        for (let i = 0; i < this.props.items.length; i++)
          if (this.props.items[i].id == query["id"]) {
            this.props.changeItem(this.props.items[i]);
            this.setState({ extensionDeleteReq: true });
            break;
          }
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    if (!this.props.loggedIn && !getCookie("SESSION").length > 0)
      this.setState({ redirect: <Redirect to="/login" /> });

    // If on mobile, only displayed recommended section
    if (window.innerWidth < 768) this.setState({ showData: false });
  }

  // Handles changing the view on mobile
  changeView() {
    if (window.innerWidth < 768) {
      this.setState({ showData: !this.state.showData });
      this.setState({ showRec: !this.state.showRec });
    }
  }

  render() {
    return (
      <div className="flex flex-col w-screen md:w-full h-full justify-center items-center">
        {this.state.redirect}
        <Nav connect={this.props.connect} />
        <div className="flex h-full w-screen relative overflow-hidden">
          <Recommended show={this.state.showRec} changeView={this.changeView} />
          <DataDisplay
            show={this.state.showData}
            changeView={this.changeView}
            deleteReq={this.state.extensionDeleteReq}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Unlocked);
