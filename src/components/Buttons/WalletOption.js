import React from "react";

// The wallet option button for the popup
export default function WalletOption(props) {
  return (
    <button
      className={
        "rounded-xl border border-solid border-gray-300 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 dark:text-white p-4 focus:outline-none w-full" +
        (props.failed
          ? " bg-red-400 dark:bg-red-700"
          : " bg-gray-200 dark:bg-gray-700")
      }
      onClick={props.connect}
    >
      <span>
        <img src={props.icon} />
      </span>
      {props.option}
    </button>
  );
}
