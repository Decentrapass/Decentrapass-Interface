import React, { Component } from "react";
import { connect } from "react-redux";

// ICONS
import { FaRegMoon } from "react-icons/fa";
import { FiSun, FiCode } from "react-icons/fi";
import { HiOutlineDotsHorizontal, HiOutlineBookOpen } from "react-icons/hi";
import { AiOutlineInfoCircle } from "react-icons/ai";

import PendingTxs from "../Messages/PendingTxs";
import { formatAccount } from "../../functions/format";

import { Link } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    web3: state.web3,
    account: state.account,
  };
};

class AppNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      network: "",
      icon: "",
      showTxs: false,
      menu: false,
    };

    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme() {
    let current = localStorage.getItem("theme");
    if (current !== "light") {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }

    if (localStorage.theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    this.setState({
      icon: localStorage.theme === "light" ? <FaRegMoon /> : <FiSun />,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.web3 !== this.props.web3 && this.props.web3)
      this.setState({
        network: await this.props.web3.eth.net.getNetworkType(),
      });
  }

  async componentDidMount() {
    // Setting the websites theme
    if (localStorage.theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    this.setState({
      icon: localStorage.theme === "light" ? <FaRegMoon /> : <FiSun />,
    });
  }

  render() {
    return (
      <>
        {this.state.showTxs && (
          <PendingTxs closeMenu={() => this.setState({ showTxs: false })} />
        )}
        <div className="absolute left-1/2 top-0 flex justify-end mb-3 mt-10 z-40 w-2/3 transform -translate-x-1/2 h-10">
          <div className="text-xl bg-green-800 text-green-300 rounded px-4 font-mono capitalize flex items-center">
            <span>{this.state.network}</span>
          </div>
          <button
            onClick={() => this.setState({ showTxs: true })}
            className="flex focus:outline-none h-full"
          >
            <div className="text-xl h-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded px-4 ml-2 font-mono flex items-center">
              <span>Account: {formatAccount(this.props.account)}</span>
            </div>
          </button>
          <button
            onClick={this.changeTheme}
            className="text-lg px-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 ml-2 rounded focus:outline-none"
          >
            {this.state.icon}
          </button>
          <div
            className="relative h-full"
            onMouseEnter={() => this.setState({ menu: true })}
            onMouseLeave={() => this.setState({ menu: false })}
          >
            <button className="text-lg px-3 h-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 ml-2 rounded focus:outline-none">
              <HiOutlineDotsHorizontal />
            </button>

            {this.state.menu && (
              <div className="absolute bg-gray-100 dark:bg-gray-900 right-0 flex flex-col rounded-xl rounded-tr-none border-2 border-solid border-gray-300 dark:border-gray-500 overflow-hidden w-32">
                <Link
                  to="/"
                  className="w-full p-4 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white flex items-center justify-start"
                >
                  <AiOutlineInfoCircle />
                  <span className="ml-2">About</span>
                </Link>
                <Link
                  to="/docs"
                  className="w-full p-4 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white flex items-center justify-start"
                >
                  <HiOutlineBookOpen />
                  <span className="ml-2">Docs</span>
                </Link>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://github.com/Decentrapass"
                  className="w-full p-4 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white flex items-center justify-start"
                >
                  <FiCode />
                  <span className="ml-2">Code</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(AppNav);
