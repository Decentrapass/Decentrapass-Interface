import React, { Component } from "react";
import { Link } from "react-router-dom";

import LOGO from "../../img/logo.png";

export default class NoMobile extends Component {
  render() {
    return (
      <div
        className="w-full h-full fixed bg-gray-900 flex flex-col items-center justify-center"
        style={{ zIndex: "100" }}
      >
        <img src={LOGO} className="w-32 mb-10" />
        <div className="text-white text-xl sm:text-3xl text-center px-5 leading-relaxed">
          Ethereum wallets are not supported in mobile devices currently. Please
          switch to a computer to use the Decentrapass app or{" "}
          <Link to="/" className="text-green-500 underline">
            go back
          </Link>
          .
        </div>
      </div>
    );
  }
}
