import React, { Component } from "react";
import { connect } from "react-redux";

import LogoNBG from "../../img/logo-nobg.png";

import { Redirect, withRouter } from "react-router-dom";

import { decrypt, hash } from "../../functions/encryption";

import { formatData } from "../../functions/format";
import {
  saveItems,
  changeItem,
  changePage,
  saveLogin,
} from "../../state/actions";
import { GUEST_DATA } from "./GuestExamples";

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
    const contract = this.props.contract;

    if (contract) {
      if (contract !== "guest") {
        let pass = await this.props.contract.methods
          .password(this.props.account)
          .call();

        if (!pass || pass === "") {
          this.setState({ redirect: <Redirect to="/register" /> });
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
            console.log(JSON.stringify(dataToSave));

            this.props.saveItems(dataToSave);
            this.props.changeItem(dataToSave[0]);
            this.props.saveLogin(true);
            this.setState({ redirect: <Redirect to="/unlocked" /> });
          }
        }
      }
    }
  }

  async handleSubmit(e) {
    e.preventDefault();
    let pass;
    let dataToSave;

    // If the contract is for guest then we skip validation
    if (this.props.contract !== "guest") {
      pass = hash(this.state.pass, this.props.account);

      let numItems = await this.props.contract.methods
        .numObjects(this.props.account)
        .call();

      dataToSave = await formatData(
        numItems,
        this.props.contract.methods,
        this.props.account
      );

      dataToSave = decrypt(dataToSave, pass);
    } else {
      dataToSave = GUEST_DATA;
      pass = "1234";
    }

    if (this.props.password === pass) {
      this.props.saveItems(dataToSave);
      this.props.changeItem(dataToSave[0]);
      this.props.saveLogin(true);
      this.setState({ redirect: <Redirect to="/unlocked" /> });

      var current = new Date().toLocaleString();

      // Saving last user login - can be modified manually but its not a security risk
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
          <form
            className="flex form w-11/12 lg:w-1/2 h-16"
            onSubmit={this.handleSubmit}
          >
            <input
              id="unlock-input"
              type="password"
              className="w-full border-2 border-solid dark:text-white bg-gray-300 border-gray-300 dark:bg-gray-700 dark:border-gray-700 text-xl lg:text-2xl px-5 py-3 focus:outline-none focus:border-blue-500 dark:focus:outline-none dark:focus:border-blue-500 rounded-l-xl"
              placeholder={
                "Enter your master password" +
                (this.props.account === "guest" ? " (try '1234')" : "")
              }
              onChange={(e) => {
                this.setState({ pass: e.target.value, wrongPass: false });
              }}
              autoFocus
            />
            <button
              type="submit"
              className="bg-green-500 border-green-500 py-3 px-4 rounded-r-xl focus:outline-none flex items-center justify-center h-full"
            >
              <img src={LogoNBG} className="h-full" />
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
