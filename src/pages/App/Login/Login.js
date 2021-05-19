import React, { Component } from "react";
import { FaUnlock } from "react-icons/fa";
import { connect } from "react-redux";

import { Redirect, withRouter } from "react-router-dom";

import { decrypt, hash } from "../../../functions/encryption";
import { formatData } from "../../../functions/format";
import {
  saveItems,
  changeItem,
  changePage,
  saveLogin,
} from "../../../state/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    saveItems: (data) => dispatch(saveItems(data)),
    changeItem: (item) => dispatch(changeItem(item)),
    changePage: (page) => dispatch(changePage(page)),
    saveLogin: (page) => dispatch(saveLogin(page)),
  };
};

const mapStateToProps = (state) => {
  return {
    contract: state.contract,
    account: state.account,
    password: state.password,
  };
};

export class Login extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    pass: "",
    wrongPass: false, // Manages error message
    redirect: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.web3 !== this.props.web3 && this.props.contract) {
      let pass = await this.props.contract.methods
        .password(this.props.account)
        .call();

      if (!pass || pass === "") {
        this.setState({ redirect: <Redirect to="/app/register" /> });
      }

      if (localStorage.localSession) {
        let passLS = localStorage.localSession.split("-")[0];
        let time = new Date(localStorage.localSession.split("-")[1]);
        let now = new Date();

        let diff = (now.getTime() - time.getTime()) / 3600 / 1000;
        if (diff >= 1 || diff < 0 || passLS !== pass) {
          localStorage.removeItem("localSession");
        } else {
          let numItems = await this.props.contract.methods
            .numObjects(this.props.account)
            .call();

          let dataToSave = await formatData(
            numItems,
            this.props.contract.methods,
            this.props.account
          );

          dataToSave = decrypt(dataToSave, pass);
          this.props.saveItems(dataToSave);
          this.props.changeItem(dataToSave[0]);
          this.props.saveLogin(true);
          this.setState({ redirect: <Redirect to="/app/unlocked" /> });
        }
      }
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    let pass = hash(this.state.pass, this.props.account);

    let numItems = await this.props.contract.methods
      .numObjects(this.props.account)
      .call();

    let dataToSave = await formatData(
      numItems,
      this.props.contract.methods,
      this.props.account
    );

    dataToSave = decrypt(dataToSave, pass);

    if (this.props.password === pass) {
      this.props.saveItems(dataToSave);
      this.props.changeItem(dataToSave[0]);
      this.props.saveLogin(true);
      this.setState({ redirect: <Redirect to="/app/unlocked" /> });

      var current = new Date().toLocaleString();
      console.log(current);

      localStorage.setItem("localSession", pass + "-" + current);
    } else {
      this.props.saveLogin(false);
      this.setState({ wrongPass: true });
    }
  }

  render() {
    return (
      <>
        {this.state.redirect}
        <div className="flex flex-col items-center justify-center w-full h-full">
          <form className="flex form w-1/2" onSubmit={this.handleSubmit}>
            <input
              id="unlock-input"
              type="password"
              className="w-full border-2 border-solid dark:text-white bg-gray-300 border-gray-300 dark:bg-gray-700 dark:border-gray-700 text-2xl px-5 py-3 focus:outline-none focus:border-blue-500 dark:focus:outline-none dark:focus:border-blue-500 rounded-bl-xl"
              placeholder="Enter your master password"
              onChange={(e) => {
                this.setState({ pass: e.target.value, wrongPass: false });
              }}
              autoFocus
            />
            <button
              type="submit"
              className="bg-green-500 border-green-500 py-3 px-4 rounded-tr-xl focus:outline-none"
            >
              <FaUnlock />
            </button>
          </form>
          {this.state.wrongPass && (
            <div className="text-red-500 text-2xl mt-3">
              <h2>Wrong master password!</h2>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
