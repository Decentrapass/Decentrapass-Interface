import React, { Component } from "react";

import Eth from "../../../img/Eth.png";
import Time from "../../../img/Time.png";
import Decetralized from "../../../img/Decentralized.png";
import { Link } from "react-router-dom";

export default class TheSafeToken extends Component {
  state = {
    theme: "",
  };
  render() {
    return (
      <div className="w-full flex items-center justify-center text-gray-200 py-16 bg-green-1000 dark:bg-gray-800">
        <div className="w-11/12 lg:w-4/5 2xl:w-3/5 flex flex-col items-center justify-center font-sans">
          <h2 className="text-4xl lg:text-5xl font-black w-3/4 text-center mb-3">
            The future of Decentrapass.
          </h2>
          <h3 className="text-xl lg:w-2/3 text-center">
            The SAFE token has a single but important use: user-drove
            governance. These are the three main reasons why this token exists:
          </h3>
          <div className="flex flex-col lg:flex-row w-full justify-center items-start mt-20 mb-24">
            <div className="flex-col items-center justify-start text-center w-full mb-16 lg:mb-0 lg:w-1/3">
              <img src={Eth} className="w-1/2 lg:w-2/3 block m-auto mb-8" />
              <h4 className="text-2xl font-bold mb-2">Ethereum's vision</h4>
              <p className="leading-normal">
                Keeping permissionless access, security and immutability
                allowing everyone everywhere to use it safely is essential for
                the future of blockchain technology.
              </p>
            </div>
            <div className="flex-col items-center justify-start text-center mb-16 lg:mb-0 lg:mx-7 w-full lg:w-1/3">
              <img
                src={Decetralized}
                className="w-1/2 lg:w-2/3 block m-auto mb-8"
              />
              <h4 className="text-2xl font-bold mb-2">Decentralization</h4>
              <p className="leading-normal">
                By delegating the decisions to network we continue to keep the
                network owned by the users that use it, avoiding control by a
                single person/group of people.
              </p>
            </div>
            <div className="flex-col items-center justify-start text-center w-full lg:w-1/3">
              <img src={Time} className="w-1/2 lg:w-2/3 block m-auto mb-8" />
              <h4 className="text-2xl font-bold mb-2">Existence</h4>
              <p className="leading-normal">
                By keeping Decentrapass an open-source project where users
                decide on the future of the project, Decentrapass can persist in
                time without the need of a single entity to mantain it.
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <p className="text-xl mb-4">Learn more about the SAFE token</p>
            <Link
              to="docs/token"
              className="transition-colors transition-transform border-2 border-solid border-white rounded-full py-3 px-5 text-lg hover:bg-gray-900 hover:text-green-400 hover:border-green-400 dark:hover:bg-gray-900 dark:hover:text-green-500 dark:hover:border-green-500 transform hover:scale-105"
            >
              Discover SAFE
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
