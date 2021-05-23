import React from "react";
import { connect } from "react-redux";

// ICONS
import { IoMdClose } from "react-icons/io";
import { FiExternalLink, FiCopy } from "react-icons/fi";
import Jazzicon from "../Nav/Jazzicon";

// Changes account to 0x00...000
import { formatAccount } from "../../functions/format";

const mapStateToProps = (state) => {
  return {
    account: state.account,
    pendingTxs: state.pendingTxs,
  };
};

// Displays pending txs
function PendingTxs(props) {
  return (
    <div
      className="w-full h-full absolute top-0 left-0 flex items-center justify-center z-30 bg-black bg-opacity-50"
      onClick={props.closeMenu}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl dark:text-white flex flex-col border-2 border-solid border-gray-400 dark:border-gray-500 overflow-hidden">
        <div className="flex justify-between items-center p-5 pb-0">
          <p className="text-xl">Account</p>
          <IoMdClose
            className="text-2xl ml-4 cursor-pointer"
            onClick={props.closeMenu}
          />
        </div>
        <div className="flex flex-col border border-solid border-gray-500 rounded-xl p-3 my-5 mx-5">
          <div className="flex justify-between items-center mb-3">
            <div className="text-xl flex items-center">
              <span>{formatAccount(props.account, 4)}</span>
              <Jazzicon account={props.account} addedClasses="ml-3" />
            </div>
            <button
              className="text-blue-500 py-1 px-2 text-md border border-solid border-blue-500 rounded-full hover:underline"
              onClick={props.connect}
            >
              change
            </button>
          </div>
          <div className="flex">
            <a
              href={"https://etherscan.io/address/" + props.account}
              className="text-gray-500 hover:underline flex mr-3"
              target="_blank"
              rel="noreferrer"
            >
              <FiExternalLink />
              View on Etherscan
            </a>
            <span
              className="text-gray-500 hover:underline flex cursor-pointer"
              onClick={() => navigator.clipboard.writeText(props.account)}
            >
              <FiCopy />
              Copy Address
            </span>
          </div>
        </div>
        <div className="flex flex-col py-3 px-5 w-full bg-gray-100 dark:bg-gray-700">
          {props.pendingTxs.length !== 0 && (
            <p className="pb-1 text-lg">Pending transactions:</p>
          )}
          {props.pendingTxs.map((tx, key) => {
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
          {props.pendingTxs.length === 0 && (
            <p className="tetx-gray-700 dark:text-gray-300">
              No pending transactions...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(PendingTxs);
