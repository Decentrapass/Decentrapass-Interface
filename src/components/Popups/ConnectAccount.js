import React, { Component } from "react";
import { IoClose } from "react-icons/io5";
import WalletOption from "../Buttons/WalletOption";

// If no web3 account is detected we either ask to connect one or
// offer to try without one
export default class ConnectAccount extends Component {
  render() {
    return (
      <div className="absolute bg-opacity-50 bg-black left-0 top-0 w-full h-full flex items-center justify-center z-30">
        <div className="relative rounded-xl p-10 bg-white dark:bg-gray-800 flex flex-col border-2 border-solid border-gray-400 dark:border-gray-500 dark:text-white w-11/12 lg:w-1/3">
          <IoClose
            onClick={this.props.noWallet}
            className="absolute right-5 top-5 text-3xl cursor-pointer"
          />
          <div className="pb-7 w-full">
            <h1 className="font-black font-sans text-5xl mb-5">Hold on!</h1>
            <p className="leading-relaxed">
              This application requires you to connect an Ethereum wallet. To
              continue please choose one of the following options:
            </p>
          </div>
          <div className="py-7 w-full">
            <h2 className="text-lg mb-3 font-black">
              1. Connect the Ethereum wallet of your choice
            </h2>

            {/* Available wallet options */}
            <WalletOption
              connect={this.props.connect}
              option="Metamask"
              failed={this.props.failed}
            />
          </div>
          <div className="pt-7">
            <h2 className="text-lg mb-3 font-black">
              2. Don't have a wallet? Try it without one (only visuals)
            </h2>
            <button
              className="rounded-xl border border-solid border-gray-300 dark:border-gray-800 bg-gray-200 dark:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-500 dark:text-white p-4 focus:outline-none w-full"
              onClick={() => this.props.noWallet()}
            >
              Continue without a wallet
            </button>
          </div>
        </div>
      </div>
    );
  }
}
