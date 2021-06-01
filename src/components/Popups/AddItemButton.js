import React, { Component } from "react";

// ICONS
import { FaUserAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { AiFillCreditCard } from "react-icons/ai";
import { CgNotes } from "react-icons/cg";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { addItem } from "../../state/actions";

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (type) => dispatch(addItem(type)),
  };
};

class AddItemButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      redirect: null,
    };

    this.wrapperRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
  }

  // Listen to clicks to close menu
  componentDidMount() {
    window.addEventListener("mousedown", this.handleClick.bind(this));
  }

  // Stop listening to clicks when unmounted
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick.bind(this));
  }

  // Handles closing the menu when clicking outside
  handleClick(e) {
    if (
      this.state.open &&
      this.wrapperRef &&
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(e.target)
    ) {
      this.setState({ open: false });
    }
  }

  // Handles changing state depending on the add button clicked
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

    this.setState({ redirect: <Redirect to="/unlocked/add" /> });
  };

  render() {
    return (
      <div className="h-full flex items-center justify-center relative">
        {this.state.redirect}

        {/* Add item button */}
        <button
          className="w-12 h-12 text-3xl text-gray-500 rounded-full bg-green-50 dark:bg-gray-800 border border-gray-400 dark:border-gray-700 transform hover:scale-105 focus:scale-105 transition-all flex items-center justify-center focus:bg-white dark:focus:bg-gray-900 outline-none hover:outline-none focus:outline-none focus:text-gray-700 dark:focus:text-white focus:border-gray-400 dark:focus:border-white hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white"
          onClick={() => this.setState({ open: true })}
        >
          <IoMdAdd />
        </button>

        {/* Add item popup */}
        <div
          className="padding-3 bg-white dark:bg-gray-900 text-gray-800 dark:text-white border-2 rounded-xl rounded-tr-none border-gray-300 dark:border-gray-500 border-solid overflow-hidden w-64 absolute right-0 top-full"
          style={this.state.open ? { display: "block" } : { display: "none" }}
          ref={this.wrapperRef}
        >
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
    );
  }
}

export default connect(null, mapDispatchToProps)(AddItemButton);
