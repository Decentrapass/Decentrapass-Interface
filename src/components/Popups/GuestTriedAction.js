import React, { Component } from "react";

// ICONS
import { IoClose } from "react-icons/io5";
import { BiErrorCircle } from "react-icons/bi";

import { Redirect } from "react-router";

export default class GuestTriedAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ redirect: <Redirect to="/login" /> });
  }

  render() {
    return (
      <div className="absolute bg-opacity-50 bg-black left-0 top-0 w-full h-full flex items-center justify-center z-30">
        {this.state.redirect}
        <div className="relative rounded-xl p-5 bg-white dark:bg-gray-800 flex flex-col border-2 border-solid border-gray-400 dark:border-gray-500 dark:text-white w-1/3">
          <IoClose
            onClick={this.props.onClose}
            className="absolute right-5 top-5 text-3xl cursor-pointer"
          />
          <div className="pb-7 w-full border-b border-solid border-gray-300 dark:border-gray-200">
            <h1 className="font-black font-sans text-4xl mb-5 text-red-500 flex items-center">
              <BiErrorCircle />
              <span className="ml-3">Hey, you can't do that!</span>
            </h1>
            <p className="leading-relaxed">
              To interact with the application you need to connect an ethereum
              wallet! Please choose one of the following:
            </p>
          </div>
          <div className="py-7 w-full border-b border-solid border-gray-300 dark:border-gray-200">
            <h2 className="text-lg mb-3 font-black">
              1. Connect the Ethereum wallet of your choice
            </h2>
            <button
              className="rounded-xl border border-solid border-gray-300 dark:border-gray-800 bg-gray-200 dark:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-500 dark:text-white p-4 focus:outline-none w-full"
              onClick={this.handleClick}
            >
              Metamask
            </button>
          </div>
          <div className="pt-7">
            <h2 className="text-lg mb-3 font-black">
              2. Don't have a wallet? Install one!
            </h2>
            <a
              className="rounded-xl border border-solid border-gray-300 dark:border-gray-800 bg-gray-200 dark:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-500 dark:text-white p-4 focus:outline-none w-full block text-center"
              href="https://metamask.io/"
            >
              Install Metamask
            </a>
          </div>
        </div>
      </div>
    );
  }
}
