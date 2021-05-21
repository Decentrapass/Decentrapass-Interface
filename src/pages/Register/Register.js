import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { hash } from "../../functions/encryption";
import { changePage, saveLogin, saveTx } from "../../state/actions";

import LogoNBG from "../../img/logo-nobg.png";

const mapStateToProps = (state) => {
  return {
    contract: state.contract,
    account: state.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePage: (page) => dispatch(changePage(page)),
    saveLogin: (bool) => dispatch(saveLogin(bool)),
    saveTx: (tx) => dispatch(saveTx(tx)),
  };
};

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: "",
      redirect: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidUpdate() {
    if (this.props.contract) {
      if (this.props.contract === "guest") {
        this.setState({ redirect: <Redirect to="/login" /> });
        return;
      }

      let pass = await this.props.contract.methods
        .password(this.props.account)
        .call();

      if (pass && pass !== "") {
        this.setState({ redirect: <Redirect to="/login" /> });
      }
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    let pass = hash(this.state.pass, this.props.account);

    this.props.contract.methods
      .setPass(pass)
      .send({ from: this.props.account })
      .on(
        "transactionHash",
        function (hash) {
          this.props.saveTx(hash);
        }.bind(this)
      );

    this.props.saveLogin(true);
    this.setState({ redirect: <Redirect to="/unlocked" /> });
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
              className="w-full border-2 border-solid dark:text-white bg-gray-300 border-gray-300 dark:bg-gray-700 dark:border-gray-700 text-xl lg:text-2xl px-5 py-3 focus:outline-none focus:border-blue-500 dark:focus:outline-none dark:focus:border-blue-500 rounded-bl-xl"
              placeholder="Enter a new master password"
              onChange={(e) => {
                this.setState({ pass: e.target.value });
              }}
              autoFocus
            />
            <button
              type="submit"
              className="bg-blue-500 border-blue-500 py-3 px-4 rounded-tr-xl"
            >
              <img src={LogoNBG} className="h-full" />
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
