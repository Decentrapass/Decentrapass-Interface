import React, { Component } from "react";
import { connect } from "react-redux";
import { filterItems, changeItem } from "../../state/actions";

// ICONS
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
      <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-2xl text-green-500" />
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="w-full text-2xl pl-12 pr-3 focus:outline-none rounded-none placeholder-gray-400 h-16 bg-transparent text-black dark:text-white"
          onChange={(e) => this.handleType(e)}
          onFocus={(e) => (e.target.placeholder = "")}
          onBlur={(e) => (e.target.placeholder = "Search...")}
          autoFocus
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
