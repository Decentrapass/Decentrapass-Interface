import React from "react";

import LOGO from "../../img/logo-nobg.png";

// Logo displayed in the navigation bar
export default function Logo() {
  return (
    <a
      href="https://decentrapass.github.io/Decentrapass-org/"
      className="flex h-full items-center dark:text-white"
    >
      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
        <img src={LOGO} className="h-2/3 bg-green-500" />
      </div>
      <span className="font-mono text-xl ml-3 hidden lg:block">
        Decentrapass
      </span>
    </a>
  );
}
