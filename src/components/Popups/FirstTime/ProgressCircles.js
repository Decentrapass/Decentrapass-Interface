import React from "react";

export default function ProgressCircles(props) {
  return (
    <div className="flex items-center justify-center">
      <div
        className={
          "rounded-full h-2 w-2 mx-1 " +
          (props.page == 1
            ? "bg-gray-500 dark:bg-gray-300"
            : "bg-gray-200 dark:bg-gray-700")
        }
      ></div>
      <div
        className={
          "rounded-full h-2 w-2 mx-1 " +
          (props.page == 2
            ? "bg-gray-500 dark:bg-gray-300"
            : "bg-gray-200 dark:bg-gray-700")
        }
      ></div>
      <div
        className={
          "rounded-full h-2 w-2 mx-1 " +
          (props.page == 3
            ? "bg-gray-500 dark:bg-gray-300"
            : "bg-gray-200 dark:bg-gray-700")
        }
      ></div>
      <div
        className={
          "rounded-full h-2 w-2 mx-1 " +
          (props.page == 4
            ? "bg-gray-500 dark:bg-gray-300"
            : "bg-gray-200 dark:bg-gray-700")
        }
      ></div>
      <div
        className={
          "rounded-full h-2 w-2 mx-1 " +
          (props.page == 5
            ? "bg-gray-500 dark:bg-gray-300"
            : "bg-gray-200 dark:bg-gray-700")
        }
      ></div>
    </div>
  );
}
