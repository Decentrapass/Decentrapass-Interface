import React, { Component } from "react";
import { connect } from "react-redux";

// Icons
import LogoNBG from "../../img/logo-nobg.png";
import { FiExternalLink, FiCopy } from "react-icons/fi";

// Components
import { Redirect } from "react-router-dom";
import { GUEST_DATA } from "./GuestExamples";
import Jazzicon from "../../components/Nav/Jazzicon";

// Functions
import { decrypt, hash } from "../../functions/encryption";
import { formatAccount, formatData } from "../../functions/format";
import { saveItems, changeItem, saveLogin, loading } from "../../state/actions";
import { deleteCookie, getCookie, setCookie } from "../../functions/cookies";

const mapDispatchToProps = (dispatch) => {
  return {
    saveItems: (data) => dispatch(saveItems(data)),
    changeItem: (item) => dispatch(changeItem(item)),
    saveLogin: (page) => dispatch(saveLogin(page)),
    loading: (bool) => dispatch(loading(bool)),
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
    contractReceived: false,
    rememberPass: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const contract = this.props.contract;

    // When contract is saved to state we allow login
    if (contract && !this.state.contractReceived) {
      this.setState({ contractReceived: true });

      // Guests dont connect to contract
      if (contract !== "guest") {
        let pass = await this.props.contract.methods
          .password(this.props.account)
          .call();

        // Redirect to register if no pass in contract
        if (!pass || pass === "") {
          this.props.loading(false);
          this.setState({ redirect: <Redirect to="/register" /> });
        }

        // Automatic login
        if (getCookie("SESSION").length > 0) {
          // Stored hashed password in local storage
          let passLS = getCookie("SESSION");

          // If the cookie has the wrong password we delete the session
          if (passLS != pass) {
            deleteCookie("SESSION");
            this.props.loading(false);
          } else {
            let numItems = await this.props.contract.methods
              .numObjects(this.props.account)
              .call();

            let dataToSave = await formatData(
              numItems,
              this.props.contract.methods,
              this.props.account
            );

            // Decrypt contract data
            dataToSave = decrypt(dataToSave, pass);

            // Save all data to state
            this.props.saveItems(dataToSave);
            this.props.changeItem(dataToSave[0]);
            this.props.saveLogin(true);
            this.props.loading(false);
            this.setState({ redirect: <Redirect to="/unlocked" /> });
          }
        } else this.props.loading(false);
      } else this.props.loading(false);
    } else this.props.loading(false);
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
      pass = this.state.pass;
    }

    if (this.props.password === pass) {
      this.props.saveItems(dataToSave);
      this.props.changeItem(dataToSave[0]);
      this.props.saveLogin(true);
      this.setState({ redirect: <Redirect to="/unlocked" /> });

      // Saving last user login cookie
      if (this.state.rememberPass) setCookie("SESSION", pass, 1);
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
          <div className="flex flex-col md:flex-row w-11/12 lg:w-3/4 xl:w-2/3 2xl:w-1/2 shadow-xl">
            <div className="h-full flex flex-col justify-center border-4 border-solid bg-gray-200 dark:bg-gray-700 border-gray-200 dark:border-gray-700 p-5 lg:px-10  border-r-0 dark:text-gray-300 md:w-1/2 order-last md:order-first">
              <h1 className="font-black text-3xl">Login</h1>
              <p className="leading-relaxed mt-3">
                Enter your master password to confirm it is you and decrypt your
                data. Please make sure the address is exactly{" "}
                <a href="http://decentrapass.org" className="text-blue-500">
                  decentrapass.org
                </a>{" "}
                and bookmark this page to avoid being phished.
              </p>
            </div>
            <form
              className="h-full flex flex-col items-start justify-center form border-4 border-solid border-gray-200 dark:border-gray-700 p-5 md:w-1/2 order-first md:order-last"
              onSubmit={this.handleSubmit}
            >
              <label className="lg:text-lg text-green-700 dark:text-green-400">
                User:
              </label>
              <div className="flex items-center justify-between mb-3 bg-white dark:bg-gray-700 px-5 h-16 w-full border-gray-300 dark:border-gray-700 border-2 border-solid rounded-0 lg:rounded text-lg lg:text-xl dark:text-gray-300">
                <div className="flex items-center font-mono">
                  <Jazzicon account={this.props.account} addedClasses="mr-1" />
                  {formatAccount(this.props.account, 4)}
                </div>
                <div className="flex lg:flex-col items-end text-base md:text-sm">
                  <a
                    href={"https://etherscan.io/address/" + this.props.account}
                    className="text-gray-500 dark:text-gray-400 hover:underline flex mx-2 md:mx-0 md:mb-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {window.innerWidth > 1024 ? "View on Etherscan" : ""}
                    <FiExternalLink />
                  </a>
                  <span
                    className="text-gray-500 dark:text-gray-400 hover:underline flex cursor-pointer"
                    onClick={() =>
                      navigator.clipboard.writeText(this.props.account)
                    }
                  >
                    {window.innerWidth > 1024 ? "Copy Address" : ""}
                    <FiCopy />
                  </span>
                </div>
              </div>
              <label className="lg:text-lg text-green-700 dark:text-green-400">
                Password:
              </label>
              <div className="flex h-16 w-full">
                <input
                  id="unlock-input"
                  type="password"
                  className="w-full h-full border-2 border-solid dark:text-gray-300 bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-700 text-xl lg:text-2xl px-5 py-3 focus:outline-none focus:border-green-500 dark:focus:outline-none dark:focus:border-green-500 rounded-0 lg:rounded-l placeholder-gray-300 dark:placeholder-gray-500"
                  placeholder={
                    this.props.account === "guest" ? "Try '1234'" : "Type..."
                  }
                  onChange={(e) => {
                    this.setState({ pass: e.target.value, wrongPass: false });
                  }}
                  autoFocus
                />
                <button
                  type="submit"
                  className="bg-green-500 border-green-500 py-3 px-4 lg:rounded-r focus:outline-none flex items-center justify-center h-full"
                >
                  <img src={LogoNBG} className="h-full w-auto" />
                </button>
              </div>
              <div className="flex items-center mt-3 text-gray-700 dark:text-gray-400">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    this.setState({ rememberPass: !this.state.rememberPass })
                  }
                  className="mr-1 w-4 h-4"
                  id="rememberMe"
                />
                <label htmlFor="rememberMe" className="cursor-pointer">
                  Keep me logged in for 1h
                </label>
              </div>
              {this.state.wrongPass && (
                <div className="text-red-500 text-2xl mt-4">
                  <h2>Wrong master password!</h2>
                </div>
              )}
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
