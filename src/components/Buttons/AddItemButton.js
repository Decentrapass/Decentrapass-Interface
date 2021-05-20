import React, { Component } from "react";

// ICONS
import { FaUserAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { AiFillCreditCard } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addItem, changePage } from "../../state/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (type) => dispatch(addItem(type)),
    changePage: (page) => dispatch(changePage(page)),
  };
};

class AddItemButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      redirect: null,
    };
  }

  addItemClick = (e) => {
    let selectedItem = e.target.innerText;
    this.setState({ open: !this.state.open });

    // Handles changing the creation interface
    switch (selectedItem) {
      case "Login":
        this.props.addItem("login");
        break;
      case "Credit Card":
        this.props.addItem("card");
        break;
      case "Secure Note":
        this.props.addItem("note");
        break;
      default:
        break;
    }

    this.setState({ redirect: <Redirect to="/app/unlocked/addItem" /> });
  };

  render() {
    return (
      <div
        className="h-full flex items-center justify-center ml-5 relative"
        onMouseEnter={() => this.setState({ open: true })}
        onMouseLeave={() => this.setState({ open: false })}
      >
        {this.state.redirect}
        <button className="rounded-xl hover:bg-gray-300 dark:hover:bg-gray-800 border-2 bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-600 dark:text-gray-500 text-3xl focus:outline-none w-full h-full">
          <IoMdAdd />
        </button>
        <div
          className="opacity-0 hidden absolute z-50 right-0 top-full"
          style={this.state.open ? { opacity: "1", display: "flex" } : {}}
        >
          <div className="padding-3 bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-white border-2 rounded-xl rounded-tr-none border-gray-400 dark:border-gray-500 border-solid overflow-hidden w-64">
            <ul>
              <li
                onClick={this.addItemClick}
                className="flex align-center w-full p-5 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
              >
                <span className="mr-2">
                  <FaUserAlt />
                </span>
                Login
              </li>
              <li
                onClick={this.addItemClick}
                className="flex align-center w-full p-5 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
              >
                <span className="mr-2">
                  <AiFillCreditCard />
                </span>
                Credit Card
              </li>
              <li
                onClick={this.addItemClick}
                className="flex align-center w-full p-5 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
              >
                <span className="mr-2">
                  <CgNotes />
                </span>
                Secure Note
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(AddItemButton);
