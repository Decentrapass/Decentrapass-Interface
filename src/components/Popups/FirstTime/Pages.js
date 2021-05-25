import React from "react";

// Images
import MetamaskInterface from "../../../img/MetamaskInterface.jpg";
import MetamaskAccept from "../../../img/MetamaskAccept.png";
import MetamaskRegister from "../../../img/MetamaskRegister.png";
import AddItems from "../../../img/AddItems.png";

// Icons
import { FaAsterisk, FaCheck } from "react-icons/fa";

export function Page1() {
  return (
    <div className="w-full text-center mt-5 flex flex-col items-center justify-start h-full md:px-0 pb-3 overflow-hidden">
      <h1 className="font-black text-base md:text-xl xl:text-2xl 2xl:text-3xl w-11/12">
        1) Install an Ethereum wallet
      </h1>
      <p className="my-3 w-11/12 sm:w-5/6 leading-relaxed text-sm lg:text-md">
        We recommend installing Metamask. An easy-to-use crypto wallet directly
        in your browser
      </p>
      <img src={MetamaskInterface} className="w-full h-auto" />
      <a
        href="https://metamask.io/download.html"
        target="_blank"
        rel="noreferrer"
        className="rounded-full px-7 py-3 bg-green-600 mt-2 transform hover:scale-105 transition-transform"
      >
        Install Metamask
      </a>
    </div>
  );
}

export function Page2() {
  return (
    <div className="w-full text-center mt-5 flex flex-col items-center justify-start h-full md:px-0 pb-3 overflow-hidden">
      <div className="flex flex-col w-full items-center justify-start h-1/3">
        <h1 className="font-black text-base md:text-xl xl:text-2xl 2xl:text-3xl w-11/12">
          2) Connect your Ethereum wallet
        </h1>
        <p className="my-3 w-11/12 sm:w-5/6 leading-relaxed text-sm lg:text-md">
          You will be prompted to connect your wallet. Click the connect button
          and accept the request.
        </p>
      </div>
      <img src={MetamaskAccept} className="w-auto h-2/3" />
    </div>
  );
}

export function Page3() {
  return (
    <div className="w-full text-center mt-5 flex flex-col items-center justify-between h-5/6 md:px-0 pb-3 overflow-hidden">
      <div className="flex flex-col text-center items-center justify-center">
        <h1 className="font-black text-base md:text-xl xl:text-2xl 2xl:text-3xl w-11/12">
          3) Choose a complicated password
        </h1>
        <p className="md:mt-3 mb-4 lg:mb-8 w-full sm:w-5/6 leading-relaxed text-sm lg:text-md">
          You are going to need a master password. Please make sure to remember
          it or write it down in paper (not on a device) since it cannot be
          changed later on. This password should be unique, long, and difficult!
        </p>
      </div>
      {/* INPUT PASSWORD IMAGE */}
      <div className="w-2/3 flex flex-col items-center justify-center select-none">
        <div className="bg-white p-3 xl:p-5 w-full dark:bg-gray-300 flex items-center justify-center">
          <span className="text-base sm:text-2xl md:text-4xl text-black flex items-center justify-evenly w-5/6 dark:text-gray-700">
            <FaAsterisk />
            <FaAsterisk />
            <FaAsterisk />
            <FaAsterisk />
            <FaAsterisk />
          </span>
        </div>
        <div className="flex items-center justify-center w-2/3 mt-3">
          <span className="flex items-center text-green-500">
            Strong
            <FaCheck className="ml-1" />
          </span>
          <div className="ml-4 flex items-center justify-start bg-gray-300 w-full rounded-full overflow-hidden">
            <div className="bg-green-500 py-1 w-5/6"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col text-center items-center justify-center">
        <p className="mb-3 mt-4 lg:mt-8 w-5/6 leading-relaxed text-sm lg:text-md">
          If you are interested in learning more about our password
          recommendations, check out{" "}
          {window.innerWidth < 425 && (
            <a
              href="https://decentrapass.org/passwords"
              target="_blank"
              rel="noreferrer"
              className="text-green-600"
            >
              our guide to passwords
            </a>
          )}
        </p>
        {window.innerWidth >= 425 && (
          <a
            href="https://decentrapass.org/passwords"
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-7 py-3 bg-green-600 lg:mt-4 transform hover:scale-105 transition-transform"
          >
            Our guide to passwords
          </a>
        )}
      </div>
    </div>
  );
}

export function Page4() {
  return (
    <div className="w-full text-center mt-5 flex flex-col items-center justify-start h-full md:px-0 pb-3 overflow-hidden">
      <div className="flex flex-col items-center justify-start h-1/2">
        <h1 className="font-black text-base md:text-xl xl:text-2xl 2xl:text-3xl w-11/12">
          4) Submit the form and accept the transaction
        </h1>
        <p className="sm:my-3 w-11/12 sm:w-5/6 leading-relaxed text-sm lg:text-md">
          All actions to change or store data require a transaction on the
          Ethereuum network. When you register, we will be storing your hashed
          password, so you will need to accept the transaction request.
        </p>
      </div>
      <div className="h-1/2 flex items-center justify-center">
        <img src={MetamaskRegister} className="w-11/12" />
      </div>
    </div>
  );
}

export function Page5() {
  return (
    <div className="w-full text-center mt-5 flex flex-col items-center justify-start h-full md:px-0 pb-3 overflow-hidden">
      <h1 className="font-black text-base md:text-xl xl:text-2xl 2xl:text-3xl w-11/12">
        5) Click the + icon and start saving your items!
      </h1>
      <p className="my-3 w-11/12 sm:w-5/6 leading-relaxed text-sm lg:text-md">
        Once you are registered, you will be redirected to the main page. Here,
        you can click the + icon and start adding items to your vault. Every
        time you create one, you'll have to approve the transaction and done!
      </p>
      <div className="flex-grow flex items-center justify-center mb-3 border-t-2 border-b-2 border-solid border-gray-400 w-full">
        <img src={AddItems} className="h-full" />
      </div>
    </div>
  );
}
