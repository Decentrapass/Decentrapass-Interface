import React, { Component } from "react";

export default class TheSafeToken extends Component {
  render() {
    return (
      <div className="w-full flex items-center justify-center bg-green-900 text-white py-16">
        <div className="w-3/5 flex flex-col items-center justify-center font-sans">
          <h2 className="text-4xl font-black w-2/3 text-center mb-3">
            Deciding the future of Decentrapass
          </h2>
          <h3 className="text-xl w-2/3 text-center mb-10">
            The SAFE token has a single but important use: user-drove
            governance. These are the three main reasons why this token exists:
          </h3>
          <div className="grid grid-cols-3">
            <div className="flex-col items-center justify-start text-center">
              <img src="" />
              <h4 className="text-lg font-bold">
                To continue Ethereum's vision
              </h4>
              <p className="leading-normal">
                Keeping permissionless access, security and immutability
                allowing everyone everywhere to use it safely is essential for
                the future of blockchain technology.
              </p>
            </div>
            <div className="flex-col items-center justify-start text-center mx-7">
              <img src="" />
              <h4 className="text-lg font-bold">
                To keep the network decentralized
              </h4>
              <p className="leading-normal">
                By delegating the decisions to network we continue to keep the
                network owned by the users that use it, avoiding control by a
                single person/group of people.
              </p>
            </div>
            <div className="flex-col items-center justify-start text-center">
              <img src="" />
              <h4 className="text-lg font-bold">
                To make Decentrapass self-sustainable
              </h4>
              <p className="leading-normal">
                By keeping Decentrapass an open-source project where users
                decide on the future of the project, Decentrapass can persist in
                time without the need of a single entity to mantain it.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
