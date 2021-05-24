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

    this.setState({ redirect: <Redirect to="/unlocked/addItem" /> });
  };

  render() {
    return (
      <div className="h-full flex items-center justify-center">
        {this.state.redirect}

        {/* Add item button */}
        <button
          className="hover:bg-gray-300 dark:hover:bg-gray-900 border-b-2 bg-green-50 dark:bg-gray-800 border-gray-400 px-2 lg:px-4 py-2 text-gray-600 dark:text-gray-500 text-3xl focus:outline-none w-full h-full"
          onClick={() => this.setState({ open: true })}
        >
          <IoMdAdd />
        </button>

        {/* Add item popup */}
        <div
          className="padding-3 bg-white dark:bg-gray-900 text-gray-800 dark:text-white border-2 rounded-xl rounded-tr-none border-gray-300 dark:border-gray-500 border-solid overflow-hidden w-64 absolute right-0 top-12 lg:top-16"
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
