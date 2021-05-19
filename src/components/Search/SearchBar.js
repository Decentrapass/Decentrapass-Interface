import React, { Component } from "react";
import { connect } from "react-redux";
import { filterItems, changeItem } from "../../state/actions";

import { FaSearch } from "react-icons/fa";

const mapStateToProps = (state) => {
  return { items: state.items };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeItem: (item) => dispatch(changeItem(item)),
    filterItems: (items) => dispatch(filterItems(items)),
  };
};

class SearchBar extends Component {
  handleType = (e) => {
    // Filters for searching
    var newItems = this.props.items.filter((el) => {
      let val = e.target.value.toLowerCase();
      if (el.type === "login")
        return (
          el["title"].toLowerCase().includes(val) ||
          el["username"].toLowerCase().includes(val) ||
          el["email"].toLowerCase().includes(val)
        );
      else if (el.type === "card")
        return (
          el["title"].toLowerCase().includes(val) ||
          el["name"].toLowerCase().includes(val) ||
          el["cardType"].toLowerCase().includes(val)
        );
      else if (el.type === "note")
        return (
          el["note"].toLowerCase().includes(val) ||
          el["title"].toLowerCase().includes(val)
        );
      else return false;
    });

    // If search bar is empty display all
    if (e.target.value === "") newItems = this.props.items;

    this.props.filterItems(newItems);
    this.props.changeItem(newItems[0] || null);
  };

  render() {
    return (
      <div className="w-full relative border-2 border-gray-300 dark:border-gray-600 border-solid rounded-xl overflow-hidden">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="w-full dark:text-white bg-gray-200 dark:bg-gray-700 text-2xl px-5 py-3 focus:outline-none"
          onChange={(e) => this.handleType(e)}
        />
        <FaSearch className="absolute top-1/2 right-5 transform -translate-y-1/2 text-2xl text-gray-500" />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
