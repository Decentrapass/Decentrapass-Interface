import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

// Functions
import { hash } from "../../functions/encryption";
import { saveLogin, savePassword, saveTx } from "../../state/actions";
import { formatAccount } from "../../functions/format";
import { setCookie } from "../../functions/cookies";

// Icons
import { FiExternalLink, FiCopy } from "react-icons/fi";
import { MdDone } from "react-icons/md";

// Components
import Jazzicon from "../../components/Nav/Jazzicon";
import PassDifficultyBar from "./PassDifficultyBar";

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
    savePassword: (pass) => dispatch(savePassword(pass)),
  };
};

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pass: "",
      redirect: null,
      rememberPass: false,
      copyText: <FiCopy />,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.copyText = this.copyText.bind(this);
  }

  async componentDidUpdate() {
    if (this.props.contract) {
      // Guests cant register without connecting first
      if (this.props.contract === "guest") {
        this.setState({ redirect: <Redirect to="/login" /> });
        return;
      }

      // Get password from contract and redirect to login if it exists
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

    // Hash typed password
    let passSend = hash(this.state.pass, this.props.account, 10000);
    let passSave = hash(this.state.pass, this.props.account, 5000);

    // Save to contract and save txs to pending txs popup
    this.props.contract.methods
      .setPass(passSend)
      .send({ from: this.props.account })
      .on(
        "transactionHash",
        function (hash) {
          this.props.saveTx(hash);
        }.bind(this)
      );

    this.props.savePassword(passSave);
    this.props.saveLogin(true);
    if (this.state.rememberPass)
      setCookie("SESSION", this.props.account + "," + passSave, 1);
    this.setState({ redirect: <Redirect to="/unlocked" /> });
  }

  copyText() {
    // Copys data to clipboard
    this.setState({
      copyText: <MdDone />,
    });

    navigator.clipboard.writeText(this.props.account);

    setTimeout(
      function () {
        this.setState({
          copyText: <FiCopy />,
        });
      }.bind(this),
      800
    );
  }

  render() {
    return (
      <>
        {this.state.redirect}
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col md:flex-row w-11/12 lg:w-3/4 xl:w-2/3 2xl:w-1/2 shadow-xl overflow-y-auto h-4/5 md:h-auto border-4 border-solid  border-gray-200 dark:border-gray-700">
            <div className="h-full flex flex-col justify-center bg-gray-200 dark:bg-gray-700 p-5 lg:px-10 border-r-0 dark:text-gray-300 md:w-1/2 order-last md:order-first">
              <h1 className="font-black text-2xl md:text-3xl">Register</h1>
              <p className="leading-relaxed mt-3 text-sm md:text-base">
                Enter a new password that will be used to confirm your identity
                and decrypt your passwords. Make sure to save this url (
                <a href="http://decentrapass.org" className="text-blue-500">
                  decentrapass.org
                </a>
                ) to your bookmarks to avoid being phished in the future.
              </p>
              <p className="leading-relaxed mt-3 text-sm md:text-base">
                The password will be the only thing you will need to remember to
                log in. Make it as hard as possible and avoid saving it in the
                internet or losing it, since it can't be changed.
              </p>
              <p className="leading-relaxed mt-3 text-sm md:text-base">
                Read more about our recommendations{" "}
                <a href="" className="text-blue-500">
                  here
                </a>
              </p>
            </div>
            <form
              className="h-full flex flex-col items-start justify-center form p-5 md:w-1/2 order-first md:order-last"
              onSubmit={this.handleSubmit}
            >
              <label className="lg:text-lg text-green-700 dark:text-green-400">
                User:
              </label>
              <div className="flex items-center justify-between mb-3 bg-white dark:bg-gray-700 px-3 md:px-5 h-10 md:h-16 w-full border-gray-300 dark:border-gray-700 border-2 border-solid rounded-0 lg:rounded text-base md:text-lg lg:text-xl dark:text-gray-300">
                <div className="flex items-center font-mono">
                  <Jazzicon account={this.props.account} addedClasses="mr-1" />
                  {formatAccount(this.props.account, 4)}
                </div>
                <div className="flex lg:flex-col items-end text-base md:text-sm">
                  <a
                    href={"https://etherscan.io/address/" + this.props.account}
                    className="text-gray-500 dark:text-gray-400 hover:underline flex mx-2 md:mx-0 md:mb-2 items-center gap-1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {window.innerWidth > 1024 ? "View on Etherscan" : ""}
                    <FiExternalLink />
                  </a>
                  <span
                    className="text-gray-500 dark:text-gray-400 hover:underline flex cursor-pointer items-center gap-1"
                    onClick={this.copyText}
                  >
                    {window.innerWidth > 1024 ? "Copy Address" : ""}
                    {this.state.copyText}
                  </span>
                </div>
              </div>
              <label className="lg:text-lg text-green-700 dark:text-green-400">
                Password:
              </label>
              <div className="flex h-10 md:h-16 w-full">
                <input
                  id="unlock-input"
                  type="password"
                  className="w-full h-full border-2 border-solid dark:text-gray-300 bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-700 text-lg md:text-xl lg:text-2xl px-3 md:px-5 py-3 focus:outline-none focus:border-green-500 dark:focus:outline-none dark:focus:border-green-500 rounded-0 lg:rounded placeholder-gray-300 dark:placeholder-gray-500"
                  placeholder="Type here..."
                  onChange={(e) => {
                    this.setState({ pass: e.target.value });
                  }}
                  autoFocus
                />
              </div>
              <PassDifficultyBar pass={this.state.pass} />
              <div className="flex items-center mt-3 text-gray-700 dark:text-gray-400">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    this.setState({ rememberPass: !this.state.rememberPass })
                  }
                  className="mr-1 w-4 h-4"
                  id="rememberMeReg"
                />
                <label htmlFor="rememberMeReg" className="cursor-pointer">
                  Keep me logged in for 1h
                </label>
              </div>
              <button
                type="submit"
                className="bg-green-500 dark:bg-green-800 py-5 px-4 rounded-0 lg:rounded focus:outline-none flex items-center justify-center h-10 md:h-16 mt-4 w-full text-base md:text-xl dark:text-gray-300 transform hover:scale-105 dark:hover:bg-green-600 hover:bg-green-700 transition-transform tansition-colors"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
