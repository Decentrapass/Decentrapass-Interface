import React from "react";

export default function Landing() {
  return (
    <div
      className="flex flex-col items-center justify-center w-full dark:text-gray-200"
      style={{ height: "80vh" }}
    >
      <div className="w-11/12 lg:w-full text-center text-4xl lg:text-7xl uppercase font-black font-sans mb-5 flex flex-col items-center">
        <h1>
          <span className="text-green-400">Decentra</span>pass
        </h1>
        <h1>
          {" "}
          is here
          <span className="text-green-400">!</span>
        </h1>
      </div>
      <div className="italic text-xl font-serif">
        "Not your keys, not your passwords"
      </div>
    </div>
  );
}
