import React, { Component } from "react";
import { connect } from "react-redux";

// Redux actions
import {
  changeAccount,
  saveWeb3,
  savePassword,
  saveContract,
} from "./state/actions";

// React router
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

// Web3 utilities
import Web3 from "web3";
import { TOKEN_ABI, TOKEN_ADDRESS } from "./web3/web3constants";
import Web3Modal from "web3modal";

// Components
import Nav from "./components/Nav/Nav";
import NotFound from "./pages/NotFound/NotFound";
import ConnectAccount from "./components/Popups/ConnectAccount";

// Pages
import AddItem from "./pages/AddItem/AddItem";
import EditItem from "./pages/EditItem/EditItem";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Unlocked from "./pages/Unlocked/Unlocked";

// Redux
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: false,
      render: null,
      showPopup: false,
    };

    this.connect = this.connect.bind(this);
    this.saveConnection = this.saveConnection.bind(this);
    this.noWallet = this.noWallet.bind(this);
  }

  async saveConnection(web3) {
    const contract = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);
    const accounts = await web3.eth.getAccounts();

    const password = await contract.methods.password(accounts[0]).call();

    this.props.changeAccount(accounts[0]);
    this.props.savePassword(password);
    this.props.saveContract(contract);

    this.setState({ showPopup: false });
  }

  async connect() {
    const providerOptions = {};
    const web3Modal = new Web3Modal({
      providerOptions,
    });

    const provider = await web3Modal.connect();

    const web3 = new Web3(provider);
    this.saveConnection(web3);
  }

  async componentWillMount() {
    if (typeof window.ethereum !== "undefined") {
      this.setState({ showPopup: false });
      const web3 = new Web3(window.ethereum);
      let accounts = await web3.eth.getAccounts();

      if (accounts.length > 0) {
        this.setState({ showPopup: false });
        this.saveConnection(web3);
      } else {
        this.setState({ showPopup: true });
      }
    }
    this.setState({ showPopup: true });
  }

  noWallet() {
    this.props.changeAccount("guest");
    this.props.savePassword("1234");
    this.props.saveContract("guest");

    this.setState({ showPopup: false });
  }

  render() {
    return (
      <Router>
        <Nav connect={this.connect} />
        {this.state.showPopup && (
          <ConnectAccount connect={this.connect} noWallet={this.noWallet} />
        )}
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/unlocked">
            <Unlocked />
          </Route>
          <Route exact path="/unlocked/addItem">
            <AddItem />
          </Route>
          <Route exact path="/unlocked/edit">
            <EditItem />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
