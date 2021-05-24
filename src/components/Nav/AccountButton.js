import React from "react";

import { formatAccount } from "../../functions/format";
import Jazzicon from "./Jazzicon";

// Displays the users current account and provides an onClick event
// to display pending transactions

export default function AccountButton(props) {
  return (
    <button onClick={props.openMenu} className="flex focus:outline-none h-full">
      <div className="text-lg lg:text-xl h-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded px-4 ml-2 font-mono flex items-center">
        {window.innerWidth > 768 ? (
          <span>Account: {formatAccount(props.account, 4)}</span>
        ) : (
          <span>{formatAccount(props.account, 4)}</span>
        )}
        <Jazzicon account={props.account} addedClasses="ml-3" />
      </div>
    </button>
  );
}
