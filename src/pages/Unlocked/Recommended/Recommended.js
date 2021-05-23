import React, { Component } from "react";

// Functions
import { connect } from "react-redux";

// Constants
import { SHOW_SEARCH } from "../../../components/Constants/constants";

// Components
import SearchItem from "./SearchItem";
import AddItemButton from "../../../components/Popups/AddItemButton";
import SearchBar from "../../../components/Search/SearchBar";

const mapStateToProps = (state) => {
  return { displayedItems: state.displayedItems };
};

class Recommended extends Component {
  render() {
    return (
      <div
        className="flex flex-col w-full h-full absolute lg:static lg:w-1/4 border-r-2 border-solid border-gray-400 dark:bg-gray-800 transition-transform"
        style={
          !this.props.show
            ? { transform: "translateX(-100%)" }
            : { transform: "translateX(0)" }
        }
      >
        <div className="flex w-full h-16">
          <SearchBar />
          <AddItemButton />
        </div>
        <div className="w-full cursor-pointer overflow-y-hidden mt-3">
          {this.props.displayedItems.map((item, key) => {
            // Choosing the most relevant info to show in the recommended section
            let chosenKey = "";
            let shown = "";

            for (const id of SHOW_SEARCH[item.type]) {
              if (item[id] !== "") {
                shown = item[id];
                chosenKey = id;
                break;
              }
            }

            return (
              <SearchItem
                key={key}
                itemId={item.numId}
                title={item.title}
                shown={shown}
                type={item.type}
                chosenKey={chosenKey}
                changeView={this.props.changeView}
              />
            );
          })}
          {this.props.displayedItems.length < 1 && (
            <div className="p-4 border-b border-gray-700 text-gray-700 dark:text-gray-300 w-full">
              No results matching search
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Recommended);
