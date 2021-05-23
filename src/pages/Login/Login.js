import React, { Component } from "react";
import { connect } from "react-redux";

// Icons
import LogoNBG from "../../img/logo-nobg.png";

// Components
import { Redirect } from "react-router-dom";
import { GUEST_DATA } from "./GuestExamples";

// Functions
import { decrypt, hash } from "../../functions/encryption";
import { formatData } from "../../functions/format";
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
      setCookie("SESSION", pass, 1);
    } else {
      this.props.saveLogin(false);
      this.setState({ wrongPass: true });
    }
  }

  componentDidMount() {
    this.props.loading(true);
  }

  render() {
    return (
      <>
        {this.state.redirect}
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex flex-col lg:flex-row w-11/12 lg:w-1/2">
            <div className="h-full flex flex-col border-4 border-solid bg-green-200 dark:bg-gray-700 border-green-200 dark:border-gray-700 p-5 lg:px-10  border-r-0 dark:text-white lg:w-1/2 order-last lg:order-first">
              <h1 className="font-black text-3xl">Login</h1>
              <p className="leading-relaxed mt-3">
                Enter your master password to confirm it is you and decrypt your
                data. Please make sure the address is exactly{" "}
                <span className="text-blue-500">decentrapass.com</span> and
                bookmark this page to avoid being phished.
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
                  className="w-full h-full border-2 border-solid dark:text-white bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-700 text-xl lg:text-2xl px-5 py-3 focus:outline-none focus:border-blue-500 dark:focus:outline-none dark:focus:border-blue-500 rounded-l"
                  placeholder={
                    this.props.account === "guest"
                      ? "Try '1234'"
                      : "Password..."
                  }
                  onChange={(e) => {
                    this.setState({ pass: e.target.value, wrongPass: false });
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
              {this.state.wrongPass && (
                <div className="text-red-500 text-2xl mt-3">
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
