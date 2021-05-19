import React, { Component } from "react";
import { connect } from "react-redux";
import { SHOW_SEARCH } from "../../../../components/Constants/constants";
import SearchItem from "./SearchItem";

const mapStateToProps = (state) => {
  return { displayedItems: state.displayedItems };
};

class Recommended extends Component {
  render() {
    return (
      <div className="w-2/5 border-r-2 border-gray-600 cursor-pointer overflow-y-hidden bg-white dark:bg-gray-900">
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
            />
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Recommended);
