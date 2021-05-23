import React, { Component } from "react";

/*
POPUP THAT DISPLAYS INSTRUCTIONS
1) Install an Ethereum wallet
2) Click connect and select your account
3) Select a complicated password
4) Accept the transaction to create an account
5) Create items with the + icon and accept transactions to save them
*/

// Components
import { Page1, Page2, Page3, Page4, Page5 } from "./Pages";
import ProgressCircles from "./ProgressCircles";

// Icons
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

// Functions
import { setCookie } from "../../../functions/cookies";

export default class FirstTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      render: null,
    };

    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.saveCookie = this.saveCookie.bind(this);
  }

  componentDidMount() {
    this.changePage();
  }

  nextPage() {
    if (this.state.page < 5) {
      this.setState({ page: this.state.page + 1 }, () => this.changePage());
    }
  }

  prevPage() {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 }, () => this.changePage());
    }
  }

  changePage() {
    switch (this.state.page) {
      case 1:
        this.setState({ render: <Page1 /> });
        break;
      case 2:
        this.setState({ render: <Page2 /> });
        break;
      case 3:
        this.setState({ render: <Page3 /> });
        break;
      case 4:
        this.setState({ render: <Page4 /> });
        break;
      case 5:
        this.setState({ render: <Page5 /> });
        break;
    }
  }

  saveCookie() {
    setCookie("VISIT", new Date().toString(), 24 * 365 * 100);
    this.props.closeMenu();
  }

  render() {
    return (
      <div className="absolute top-0 left-0 w-full h-full z-100 bg-black bg-opacity-60 flex items-center justify-center">
        <div className="w-11/12 lg:w-1/2 2xl:w-1/3 bg-gray-300 h-2/3 lg:h-3/4 dark:bg-gray-800 pt-3 rounded flex flex-col justify-between items-center dark:text-white relative overflow-hidden">
          <div className="w-full text-center text-gray-700 dark:text-gray-400">
            Instructions
          </div>
          <div className="h-full flex items-start">{this.state.render}</div>
          <div className="w-full flex items-center justify-between p-3">
            <button
              className="flex items-center justify-start focus:outline-none p-3 w-1/3 lg:w-1/4 xl:w-1/6"
              onClick={this.prevPage}
              style={this.state.page > 1 ? { opacity: "1" } : { opacity: "0" }}
            >
              <IoIosArrowBack />
              <span>Previous</span>
            </button>
            <ProgressCircles page={this.state.page} />
            {this.state.page < 5 && (
              <button
                className="flex items-center justify-end focus:outline-none p-3 w-1/3 lg:w-1/4 xl:w-1/6"
                onClick={this.nextPage}
              >
                <span>Next</span>
                <IoIosArrowForward />
              </button>
            )}
            {this.state.page == 5 && (
              <button
                className="flex items-center justify-center focus:outline-none bg-green-500 p-3 rounded w-1/3 lg:w-1/4 xl:w-1/6"
                onClick={this.saveCookie}
              >
                <span>Finish</span>
                <FaCheck className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
