import React from "react";
import { Component } from "react";
import { connect } from "react-redux";

import { formatAccount } from "../../functions/format";
import Jazzicon from "./Jazzicon";

const mapStateToProps = (state) => {
  return {
    account: state.account,
    pendingTxs: state.pendingTxs,
  };
};

// Displays the users current account and provides an onClick event
// to display pending transactions

class AccountButton extends Component {
  render() {
    console.log(this.props.pendingTxs.length);
    return (
      <button
        onClick={this.props.openMenu}
        className="flex focus:outline-none h-full relative bg-gray-200 dark:bg-gray-800 rounded px-4 ml-2"
      >
        {this.props.pendingTxs.length > 0 && (
          <div className="w-6 h-6 bg-red-500 rounded-full absolute top-0 left-0 flex items-center justify-center text-white font-black text-sm transform -translate-x-1/4 -translate-y-1/4">
            {this.props.pendingTxs.length}
          </div>
        )}
        <div className="text-lg lg:text-xl h-full w-full text-gray-900 dark:text-gray-200 font-mono flex items-center">
          {window.innerWidth > 768 ? (
            <span>Account: {formatAccount(this.props.account, 4)}</span>
          ) : (
            <span>{formatAccount(this.props.account, 4)}</span>
          )}
          <Jazzicon account={this.props.account} addedClasses="ml-3" />
        </div>
      </button>
    );
  }
}

export default connect(mapStateToProps)(AccountButton);
