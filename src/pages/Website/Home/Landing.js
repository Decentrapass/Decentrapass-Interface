import React from "react";

export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-5/6 dark:text-gray-200">
      <div className="w-1/3 text-center text-7xl uppercase font-black font-sans mb-5">
        <h1>
          <span className="text-green-400">Decentra</span>pass is here
          <span className="text-green-400">!</span>
        </h1>
      </div>
      <div className="italic text-xl font-serif">
        "Not your keys, not your passwords"
      </div>
    </div>
  );
}
