import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import AddItemButton from "../../../components/Buttons/AddItemButton";
import DataDisplay from "./DataDisplay/DataDisplay";
import Recommended from "./Recommended/Recommended";
import SearchBar from "../../../components/Search/SearchBar";

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

class Unlocked extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
    };
  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.setState({ redirect: <Redirect to="/app/login" /> });
    }
  }

  render() {
    return (
      <div className="flex w-full h-full justify-center items-center pt-24 pb-10">
        {this.state.redirect}
        <div className="flex flex-col w-2/3 h-full">
          <div className="flex items-center justify-center mb-5">
            <SearchBar />
            <AddItemButton />
          </div>
          <div className="flex h-full border-2 border-gray-300 dark:border-gray-600 border-solid rounded-xl overflow-hidden">
            <Recommended />
            <DataDisplay />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Unlocked);
