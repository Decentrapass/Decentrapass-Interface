import React, { Component } from "react";

export default class ConnectMetamask extends Component {
  render() {
    return (
      <div className="absolute bg-opacity-50 bg-black left-0 top-0 w-full h-full flex items-center justify-center z-50">
        <div className="rounded-xl p-5 bg-white dark:bg-gray-800 flex flex-col border-2 border-solid border-gray-400 dark:border-gray-500">
          <p className="dark:text-white mb-3">
            Please connect to a wallet to continue:
          </p>
          <button
            className="rounded-xl border border-gray-300 dark:border-gray-800 bg-gray-200 dark:bg-gray-700 hover:border-blue-500 dark:text-white p-4 focus:outline-none"
            onClick={() => this.props.connMM()}
          >
            Metamask
          </button>
        </div>
      </div>
    );
  }
}
