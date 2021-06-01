import React from "react";
import { connect } from "react-redux";

// ICONS
import { IoMdClose } from "react-icons/io";
import { FiExternalLink, FiCopy } from "react-icons/fi";
import { MdDone } from "react-icons/md";

import Jazzicon from "../Nav/Jazzicon";

// Changes account to 0x00...000
import { formatAccount } from "../../functions/format";
import { Component } from "react";

const mapStateToProps = (state) => {
  return {
    account: state.account,
    pendingTxs: state.pendingTxs,
  };
};

// Displays pending txs
class PendingTxs extends Component {
  constructor(props) {
    super(props);
    this.pendingTxsRef = React.createRef();

    this.state = {
      isGuest: false,
      copyText: (
        <>
          <FiCopy />
          Copy Address
        </>
      ),
    };

    this.copyText = this.copyText.bind(this);
  }

  copyText() {
    // Copys data to clipboard
    this.setState({
      copyText: (
        <>
          <MdDone />
          Copied
        </>
      ),
    });

    navigator.clipboard.writeText(this.props.account);

    setTimeout(
      function () {
        this.setState({
          copyText: (
            <>
              <FiCopy />
              Copy Address
            </>
          ),
        });
      }.bind(this),
      500
    );
  }

  componentDidMount() {
    this.setState({ isGuest: this.props.account === "guest" });
    document.addEventListener("mousedown", this.handleClickOutside.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener(
      "mousedown",
      this.handleClickOutside.bind(this)
    );
  }

  handleClickOutside(e) {
    if (
      this.pendingTxsRef &&
      this.pendingTxsRef.current &&
      !this.pendingTxsRef.current.contains(e.target)
    ) {
      this.props.closeMenu();
    }
  }

  render() {
    return (
      <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center z-30 bg-black bg-opacity-70">
        <div
          className="bg-white dark:bg-gray-800 rounded-xl dark:text-white flex flex-col border-2 border-solid border-gray-400 dark:border-gray-500 overflow-hidden w-11/12 sm:w-96"
          ref={this.pendingTxsRef}
        >
          <div className="flex justify-between items-center p-5 pb-0">
            <p className="text-xl">Account</p>
            <IoMdClose
              className="text-2xl ml-4 cursor-pointer"
              onClick={this.props.closeMenu}
            />
          </div>
          <div className="flex flex-col border border-solid border-gray-500 rounded-xl p-3 my-5 mx-5">
            <div className="flex justify-between items-center mb-3">
              <div className="text-xl flex items-center">
                <span>{formatAccount(this.props.account, 4)}</span>
                <Jazzicon account={this.props.account} addedClasses="ml-3" />
              </div>
              <button
                className="text-blue-500 py-1 px-2 text-md border border-solid border-blue-500 rounded-full hover:underline"
                onClick={this.props.connect}
              >
                change
              </button>
            </div>
            <div className="flex">
              <a
                href={
                  "https://ropsten.etherscan.io/address/" + this.props.account
                }
                className="text-gray-500 hover:underline flex mr-3 items-center gap-1"
                target="_blank"
                rel="noreferrer"
                style={this.state.isGuest ? { cursor: "not-allowed" } : {}}
              >
                <FiExternalLink />
                View on Etherscan
              </a>
              <span
                className="text-gray-500 hover:underline flex items-center cursor-pointer gap-1"
                onClick={this.copyText}
                style={this.state.isGuest ? { cursor: "not-allowed" } : {}}
              >
                {this.state.copyText}
              </span>
            </div>
          </div>
          <div className="flex flex-col py-3 px-5 w-full bg-gray-100 dark:bg-gray-700">
            {this.props.pendingTxs.length !== 0 && (
              <p className="pb-1 text-lg">Pending transactions:</p>
            )}
            {this.props.pendingTxs.map((tx, key) => {
              return (
                <a
                  href={"https://ropsten.etherscan.io/tx/" + tx}
                  key={key}
                  target="_black"
                  rel="noreferrer"
                  className="text-green-500 hover:underline my-1 flex"
                >
                  <FiExternalLink className="mr-1" />
                  <span>{formatAccount(tx, 14)}</span>
                </a>
              );
            })}
            {this.props.pendingTxs.length === 0 && (
              <p className="tetx-gray-700 dark:text-gray-300">
                No pending transactions...
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PendingTxs);
