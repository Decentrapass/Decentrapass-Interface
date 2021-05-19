import React, { Component } from "react";
import { connect } from "react-redux";

import { FaRegMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

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
    };

    this.changeTheme = this.changeTheme.bind(this);
  }

  format(acc) {
    acc = acc || "";
    let shortAcc =
      acc.substring(0, 6) + "..." + acc.substring(acc.length - 4, acc.length);

    return shortAcc;
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
      <div className="absolute left-1/2 top-0 flex justify-end mb-3 mt-10 z-50 w-2/3 transform -translate-x-1/2">
        <div className="text-xl bg-green-800 text-green-300 rounded py-1 px-4 font-mono capitalize">
          {this.state.network}
        </div>
        <div className="text-xl bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded py-1 px-4 ml-2 font-mono">
          Account: {this.format(this.props.account)}
        </div>
        <button
          onClick={this.changeTheme}
          className="py-1 px-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 ml-2 rounded focus:outline-none"
        >
          {this.state.icon}
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(AppNav);
