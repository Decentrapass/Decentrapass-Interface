import React, { Component } from "react";

export default class ConnectMetamask extends Component {
  render() {
    return (
      <div>
        <div className="rounded-xl p-5 bg-gray-800 flex flex-col w-1/3 h-1/3 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-white mb-3">
            Please connect to a wallet to continue:
          </p>
          <button
            className="rounded-xl border border-gray-800 bg-gray-700 hover:border-blue-500 text-white p-4"
            onClick={() => this.props.connMM()}
          >
            Metamask
          </button>
        </div>
      </div>
    );
  }
}
