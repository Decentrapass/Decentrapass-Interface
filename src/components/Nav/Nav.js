import React, { Component } from "react";
import { connect } from "react-redux";

// ICONS
import { FaRegMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

// POPUPS + LOGO
import PendingTxs from "../Popups/PendingTxs";
import OtherMenu from "../Popups/OtherMenu";
import AccountButton from "./AccountButton";
import Logo from "./Logo";
import { themesList } from "web3modal";

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
      network: "", // Current network
      icon: "", // moon/sun depending on theme
      showTxs: false, // txs menu open
      showOther: false, // "other" menu open
      web3: null, // current web3 connection to detect change in props
    };

    this.changeTheme = this.changeTheme.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleTxsMenu = this.toggleTxsMenu.bind(this);
    this.showOtherMenu = this.showOtherMenu.bind(this);
    this.wrapperRef = React.createRef();
  }

  // Handles closing the "other" menu when clicking outside
  handleClick(e) {
    if (
      this.state.showOther &&
      this.wrapperRef &&
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(e.target)
    ) {
      this.setState({ showOther: false });
    }
  }

  // Handles the moon/sun button to change theme
  changeTheme() {
    let current = localStorage.getItem("theme");
    if (current !== "light") {
      localStorage.setItem("theme", "light");
    } else {
      // Default theme is dark
      localStorage.setItem("theme", "dark");
    }

    if (localStorage.theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    // Change button icon depending on current theme
    this.setState({
      icon: localStorage.theme === "light" ? <FaRegMoon /> : <FiSun />,
    });
  }

  toggleTxsMenu() {
    this.setState({ showTxs: !this.state.showTxs });
  }

  showOtherMenu() {
    this.setState({ showOther: true });
  }

  // If the props change and a network exists > display it
  async componentDidUpdate(prevProps) {
    if (this.props.web3 && prevProps.web3 != this.state.web3) {
      this.setState({
        web3: this.props.web3, // save to compare to prevProps
        network: await this.props.web3.eth.net.getNetworkType(),
      });
    }
  }

  // Sets the existing theme and listener for closing menu
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

    window.addEventListener("mousedown", this.handleClick.bind(this));
  }

  // Dont listen to clicks if menu isnt mounted
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick.bind(this));
  }

  render() {
    return (
      <>
        {
          // Displays the txs menu
          this.state.showTxs && (
            <PendingTxs
              connect={this.props.connect}
              closeMenu={this.toggleTxsMenu}
            />
          )
        }
        <div className="flex items-center justify-between w-full px-8 py-5 border-b-2 border-solid border-green-600 dark:border-white">
          <Logo />
          <div className="flex h-8 lg:h-10">
            {/* We dont display network in mobile */}
            <div
              className="text-lg lg:text-xl bg-green-800 text-green-300 rounded px-4 font-mono capitalize items-center hidden lg:block"
              style={
                this.state.network.length > 0 && window.innerWidth > 768
                  ? { display: "flex" }
                  : { display: "none" }
              }
            >
              <span>{this.state.network}</span>
            </div>
            <AccountButton
              account={this.props.account}
              openMenu={this.toggleTxsMenu}
            />

            {/* Theme button */}
            <button
              onClick={this.changeTheme}
              className="text-lg px-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 ml-2 rounded focus:outline-none h-full"
            >
              {this.state.icon}
            </button>

            {/* "Other" menu */}
            <div className="h-full relative">
              <button
                className="text-lg px-3 h-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 ml-2 rounded focus:outline-none"
                onClick={this.showOtherMenu}
              >
                <HiOutlineDotsHorizontal />
              </button>

              {this.state.showOther && <OtherMenu innerRef={this.wrapperRef} />}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps)(Nav);
