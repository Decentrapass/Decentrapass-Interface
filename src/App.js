/* global chrome */
import React, { Component } from "react";
import { connect } from "react-redux";
import Web3 from "web3";

import AddItem from "./pages/App/AddItem/AddItem";
import EditItem from "./pages/App/EditItem/EditItem";
import Login from "./pages/App/Login/Login";
import Register from "./pages/App/Register/Register";
import Unlocked from "./pages/App/Unlocked/Unlocked";

import {
  changeAccount,
  saveWeb3,
  savePassword,
  saveContract,
} from "./state/actions";
import { TOKEN_ABI, TOKEN_ADDRESS } from "./web3/web3constants";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  withRouter,
} from "react-router-dom";

import Home from "./pages/Website/Home/Home";
import AppNav from "./components/AppNav/AppNav";
import WebNav from "./components/WebNav/WebNav";
import Loading from "./components/Messages/Loading";
import NotFound from "./pages/NotFound/NotFound";

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

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: false,
      render: null,
      metamaskEnabled: null,
    };
  }

  async connectMetamask() {
    var accessAllowed = false;
    try {
      await window.ethereum.enable();
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
    if (window.location.pathname.includes("app")) {
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
  }

  render() {
    if (
      this.state.metamaskEnabled === true ||
      !window.location.pathname.includes("app")
    )
      return (
        <>
          <Router>
            <Switch>
              <Route path="/app">
                <AppNav />
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
              </Route>
              <Route>
                <WebNav />
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route>
                    <NotFound />
                  </Route>
                </Switch>
              </Route>
            </Switch>
          </Router>
        </>
      );
    else if (this.state.metamaskEnabled === false)
      return (
        <div className="rounded-xl p-5 bg-gray-800 flex flex-col w-1/3 h-1/3 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-white mb-3">
            Please connect to a wallet to continue:
          </p>
          <button
            className="rounded-xl border border-gray-800 bg-gray-700 hover:border-blue-500 text-white p-4"
            onClick={() => this.connectMetamask()}
          >
            Metamask
          </button>
        </div>
      );
    else {
      return <Loading />;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
