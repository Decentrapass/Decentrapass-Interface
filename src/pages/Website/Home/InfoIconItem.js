import React from "react";

export default function InfoIconItem(props) {
  return (
    <div className="flex flex-col items-start justify-center dark:text-gray-200">
      <span className="text-green-500 flex w-full justify-center text-7xl">
        {props.item.icon}
      </span>
      <h2 className="font-bold text-3xl my-3">{props.item.title}</h2>
      <p className="leading-relaxed">{props.item.content}</p>
    </div>
  );
}
