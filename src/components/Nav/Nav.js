import React, { Component } from "react";
import { connect } from "react-redux";

// ICONS
import { FaRegMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import PendingTxs from "../Popups/PendingTxs";
import OtherMenu from "../Popups/OtherMenu";
import AccountButton from "./AccountButton";
import Logo from "./Logo";

const mapStateToProps = (state) => {
  return {
    web3: state.web3,
    account: state.account,
  };
};

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      network: "",
      icon: "",
      showTxs: false,
      menu: false,
      web3: null,
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

  async componentDidUpdate(prevProps) {
    if (this.props.web3 && prevProps.web3 != this.state.web3) {
      this.setState({
        web3: this.props.web3,
        network: await this.props.web3.eth.net.getNetworkType(),
      });
    }
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
          <PendingTxs
            connect={this.props.connect}
            closeMenu={() => this.setState({ showTxs: false })}
          />
        )}
        <div className="flex items-center justify-between w-full px-8 py-5 border-b-2 border-solid border-green-700 dark:border-white">
          <Logo />
          <div className="flex h-10">
            <div className="text-xl bg-green-800 text-green-300 rounded px-4 font-mono capitalize flex items-center hidden lg:block">
              <span>{this.state.network}</span>
            </div>
            <AccountButton
              account={this.props.account}
              openMenu={() => this.setState({ showTxs: true })}
            />
            <button
              onClick={this.changeTheme}
              className="text-lg px-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 ml-2 rounded focus:outline-none h-full"
            >
              {this.state.icon}
            </button>
            <div
              className="relative h-full"
              onFocus={() => this.setState({ menu: true })}
              onBlur={() =>
                setTimeout(
                  // To be able to click the items before it closes
                  function () {
                    this.setState({ menu: false });
                  }.bind(this),
                  100
                )
              }
            >
              <button className="text-lg px-3 h-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 ml-2 rounded focus:outline-none">
                <HiOutlineDotsHorizontal />
              </button>

              {this.state.menu && <OtherMenu />}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(Nav);
