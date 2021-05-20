import React, { Component } from "react";
import { connect } from "react-redux";

import {
  changeAccount,
  saveWeb3,
  savePassword,
  saveContract,
} from "../state/actions";

import { Switch, Route, Redirect } from "react-router-dom";

import Web3 from "web3";
import { TOKEN_ABI, TOKEN_ADDRESS } from "../web3/web3constants";

import AppNav from "../components/AppNav/AppNav";
import NotFound from "../pages/NotFound/NotFound";
import ConnectMetamask from "../components/Messages/ConnectMetamask";

import AddItem from "../pages/App/AddItem/AddItem";
import EditItem from "../pages/App/EditItem/EditItem";
import Login from "../pages/App/Login/Login";
import Register from "../pages/App/Register/Register";
import Unlocked from "../pages/App/Unlocked/Unlocked";
import NoMobile from "../components/AppNav/NoMobile";

const mapStateToProps = (state) => {
  return {
    web3: state.web3,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeAccount: (acc) => dispatch(changeAccount(acc)),
    saveWeb3: (web3item) => dispatch(saveWeb3(web3item)),
    saveContract: (Contract) => dispatch(saveContract(Contract)),
    savePassword: (pass) => dispatch(savePassword(pass)),
  };
};

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: false,
      render: null,
      metamaskEnabled: null,
    };

    this.connectMetamask = this.connectMetamask.bind(this);
    this.saveConnection = this.saveConnection.bind(this);
  }

  async connectMetamask() {
    var accessAllowed = false;
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      accessAllowed = true;
    } catch (e) {
      console.log("MM Error:", e);
    }

    if (accessAllowed) {
      await this.saveConnection();

      window.ethereum.on("accountsChanged", async function (accounts) {
        window.location.reload();
      });

      window.ethereum.on("networkChanged", function (networkId) {
        window.location.reload();
      });
    }
  }

  async saveConnection() {
    const web3 = this.props.web3;
    const contract = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);

    var accounts = await web3.eth.getAccounts();
    let password = await contract.methods.password(accounts[0]).call();

    this.props.changeAccount(accounts[0]);
    this.props.savePassword(password);
    this.props.saveWeb3(web3);
    this.props.saveContract(contract);

    this.setState({ metamaskEnabled: true });
  }

  async componentDidMount() {
    let accountAlreadyConnected = false;
    if (typeof window.ethereum !== "undefined") {
      var web3 = new Web3(window.ethereum);

      if ((await web3.eth.getAccounts()).length > 0)
        accountAlreadyConnected = true;

      this.props.saveWeb3(web3);
    }

    if (accountAlreadyConnected) {
      await this.connectMetamask();
    } else {
      this.setState({ metamaskEnabled: false });
    }
  }

  render() {
    return (
      <>
        {window.innerWidth <= 768 && <NoMobile />}
        <AppNav />
        {this.state.metamaskEnabled === false && window.innerWidth > 768 && (
          <ConnectMetamask connMM={this.connectMetamask} />
        )}
        <Switch>
          <Redirect exact from="/app" to="/app/login" />
          <Route exact path="/app/login">
            <Login />
          </Route>
          <Route exact path="/app/register">
            <Register />
          </Route>
          <Route exact path="/app/unlocked">
            <Unlocked />
          </Route>
          <Route exact path="/app/unlocked/addItem">
            <AddItem />
          </Route>
          <Route exact path="/app/unlocked/edit">
            <EditItem />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
