import React, { Component } from "react";
import { Link } from "react-router-dom";

import { FaTwitter, FaRedditAlien } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

export default class Footer extends Component {
  render() {
    return (
      <div className="flex w-full bg-gray-800 justify-center items-center py-24 text-white">
        <div className="w-3/5 flex justify-between">
          <div className="flex flex-col items-start w-1/3">
            <p className="text-xl">General</p>
            <Link to="/" className="text-gray-400 my-2 hover:text-gray-100">
              About
            </Link>
            <Link to="/faq" className="text-gray-400 my-2 hover:text-gray-100">
              FAQ
            </Link>
            <Link
              to="/support"
              className="text-gray-400 my-2 hover:text-gray-100"
            >
              Support
            </Link>
          </div>
          <div className="flex flex-col items-start w-1/3">
            <p className="text-xl">Technology</p>
            <Link to="/docs" className="text-gray-400 my-2 hover:text-gray-100">
              Documentation
            </Link>
            <a
              href="https://github.com/decentrapass"
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 my-2 hover:text-gray-100"
            >
              GitHub
            </a>
            <Link to="" className="text-gray-400 my-2 hover:text-gray-100">
              Token
            </Link>
          </div>
          <div className="flex justify-center w-1/3">
            <a
              href="https://twitter.com/decentrapass"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 text-2xl mr-1 flex items-center justify-center rounded-full border border-solid border-gray-400 hover:border-gray-100 text-gray-400 hover:text-gray-100"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.reddit.com/r/Decentrapass/"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 text-2xl mx-1 flex items-center justify-center rounded-full border border-solid border-gray-400 hover:border-gray-100 text-gray-400 hover:text-gray-100"
            >
              <FaRedditAlien />
            </a>
            <a
              href="mailto:decentrapass@pm.me"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 text-2xl mx-1 flex items-center justify-center rounded-full border border-solid border-gray-400 hover:border-gray-100 text-gray-400 hover:text-gray-100"
            >
              <IoMail />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
