import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { hash } from "../../functions/encryption";
import { saveLogin, saveTx } from "../../state/actions";

import LogoNBG from "../../img/logo-nobg.png";

const mapStateToProps = (state) => {
  return {
    contract: state.contract,
    account: state.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
          <div className="flex flex-col lg:flex-row w-11/12 lg:w-1/2 items-center justify-center">
            <div className="h-full flex flex-col border-4 border-solid bg-green-200 dark:bg-gray-700 border-green-200 dark:border-gray-700 p-5 lg:px-10  border-r-0 dark:text-white lg:w-1/2 order-last lg:order-first">
              <h1 className="font-black text-3xl">Register</h1>
              <p className="leading-relaxed mt-3">
                Enter a new password that will be used to confirm your identity
                and decrypt your passwords. Make sure to save this url (
                <a href="http://decentrapass.com" className="text-blue-500">
                  decentrapass.com
                </a>
                ) to your bookmarks to avoid being phished in the future.
              </p>
              <p className="leading-relaxed mt-3">
                The password will be the only thing you will need to remember to
                log in. Make it as hard as possible and avoid saving it in the
                internet or losing it, since it can't be changed when lost (due
                to the nature of cyphering).
              </p>
              <p className="leading-relaxed mt-3">
                Read more about our recommendations{" "}
                <a href="" className="text-blue-500">
                  here
                </a>
              </p>
            </div>
            <form
              className="h-full flex flex-col items-center justify-center form border-4 border-solid border-green-200 dark:border-gray-700 p-5 lg:w-1/2 order-first lg:order-last"
              onSubmit={this.handleSubmit}
            >
              <div className="flex h-16">
                <input
                  id="unlock-input"
                  type="password"
                  className="w-full border-2 border-solid dark:text-white bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-700 text-xl lg:text-2xl px-5 py-3 focus:outline-none focus:border-blue-500 dark:focus:outline-none dark:focus:border-blue-500 rounded-l"
                  placeholder="New password..."
                  onChange={(e) => {
                    this.setState({ pass: e.target.value });
                  }}
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-green-500 border-green-500 py-3 px-4 rounded-r focus:outline-none flex items-center justify-center h-full"
                >
                  <img src={LogoNBG} className="h-full" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
