import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { hash } from "../../../functions/encryption";
import { changePage, saveLogin } from "../../../state/actions";

import LogoNBG from "../../../img/logo-nobg.png";

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
      let pass = await this.props.contract.methods
        .password(this.props.account)
        .call();

      if (pass && pass !== "") {
        this.setState({ redirect: <Redirect to="/app/login" /> });
      }
    }
  }

  async handleSubmit(e) {
    e.preventDefault();

    let pass = hash(this.state.pass, this.props.account);

    this.props.contract.methods
      .setPass(pass)
      .send({ from: this.props.account });
    this.props.saveLogin(true);
    this.setState({ redirect: <Redirect to="/app/unlocked" /> });
  }

  render() {
    return (
      <>
        {this.state.redirect}
        <div className="flex flex-col items-center justify-center w-full h-full">
          <form className="flex form w-1/2 h-16 " onSubmit={this.handleSubmit}>
            <input
              id="unlock-input"
              type="password"
              className="w-full border-2 text-white bg-gray-700 border-gray-700 text-2xl px-5 py-3 focus:outline-none focus:border-blue-500 rounded-bl-xl"
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
