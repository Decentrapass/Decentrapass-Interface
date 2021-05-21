import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import DataDisplay from "./DataDisplay/DataDisplay";
import Recommended from "./Recommended/Recommended";
import Nav from "../../components/Nav/Nav";

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
      this.setState({ redirect: <Redirect to="/login" /> });
    }
  }

  render() {
    return (
      <div className="flex flex-col w-full h-full justify-center items-center">
        {this.state.redirect}
        <Nav connect={this.props.connect} />
        <div className="flex h-full w-full">
          <Recommended />
          <DataDisplay />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Unlocked);
