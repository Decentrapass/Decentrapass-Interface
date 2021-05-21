import React from "react";

import { FiCode, FiLogOut } from "react-icons/fi";
import { HiOutlineBookOpen } from "react-icons/hi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Component } from "react";

export default class OtherMenu extends Component {
  logoutRequest() {
    localStorage.removeItem("localSession");
    window.location.reload();
  }

  render() {
    return (
      <div className="absolute bg-gray-100 dark:bg-gray-900 right-0 flex flex-col rounded-xl rounded-tr-none border-2 border-solid border-gray-300 dark:border-gray-500 overflow-hidden w-32 z-30">
        <a
          href="https://decentrapass.github.io/Decentrapass-org/"
          className="w-full p-4 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white flex items-center justify-start"
        >
          <AiOutlineInfoCircle />
          <span className="ml-2">About</span>
        </a>
        <a
          href="https://decentrapass.github.io/Decentrapass-v1-docs/"
          className="w-full p-4 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white flex items-center justify-start"
        >
          <HiOutlineBookOpen />
          <span className="ml-2">Docs</span>
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/Decentrapass"
          className="w-full p-4 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white flex items-center justify-start"
        >
          <FiCode />
          <span className="ml-2">Code</span>
        </a>
        <button
          onClick={this.logoutRequest}
          className="w-full p-4 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white flex items-center justify-start focus:outline-none"
        >
          <FiLogOut />
          <span className="ml-2">Logout</span>
        </button>
      </div>
    );
  }
}
