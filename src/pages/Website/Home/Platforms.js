import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ITEM } from "./PlatformItemText";

export default class Platforms extends Component {
  render() {
    return (
      <div className="w-full flex items-center justify-center text-gray-900 py-16 bg-green-100 dark:text-gray-300 dark:bg-gray-900">
        <div className="w-5/6 lg:w-4/5 2xl:w-3/5 flex flex-col items-center justify-center font-sans">
          <h2 className="text-4xl lg:text-5xl font-black lg:w-3/4 text-center mb-16">
            A suit of tools to decentralize your private information.
          </h2>
          <div className="flex flex-col lg:flex-row w-full justify-center items-center">
            {/* Extension card */}
            <a
              href=""
              className="flex flex-col items-center bg-white dark:bg-gray-700 shadow-xl dark:shadow-xl justify-start dark:text-gray-200 rounded-xl w-3/4 lg:w-1/4 py-16 transform hover:scale-105 transition-transform mb-16 lg:mb-0"
            >
              <span className="text-green-500 flex w-full justify-center text-7xl">
                {ITEM[0].icon}
              </span>
              <h2 className="font-bold text-3xl my-3 text-center">
                {ITEM[0].title}
              </h2>
              <p className="leading-relaxed text-center w-5/6">
                {ITEM[0].content}
              </p>
            </a>

            {/* App card */}
            <Link
              to="/app/login"
              className="lg:mx-10 flex flex-col items-center bg-white dark:bg-gray-700 shadow-xl dark:shadow-xl justify-start dark:text-gray-200 rounded-xl w-3/4 lg:w-1/4 py-16 transform hover:scale-105 transition-transform mb-16 lg:mb-0"
            >
              <span className="text-green-500 flex w-full justify-center text-7xl">
                {ITEM[1].icon}
              </span>
              <h2 className="font-bold text-3xl my-3 text-center">
                {ITEM[1].title}
              </h2>
              <p className="leading-relaxed text-center w-5/6">
                {ITEM[1].content}
              </p>
            </Link>

            {/* Mpbile app card */}
            <a
              href=""
              className="flex flex-col items-center bg-white dark:bg-gray-700 shadow-xl dark:shadow-xl justify-start dark:text-gray-200 rounded-xl w-3/4 lg:w-1/4 py-16 transform hover:scale-105 transition-transform"
            >
              <span className="text-green-500 flex w-full justify-center text-7xl">
                {ITEM[2].icon}
              </span>
              <h2 className="font-bold text-3xl my-3 text-center">
                {ITEM[2].title}
              </h2>
              <p className="leading-relaxed text-center w-5/6">
                {ITEM[2].content}
              </p>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
