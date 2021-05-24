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
      showRec: true, // Handles view on mobile
      showData: true, // Handles view on mobile
    };

    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    // Only allow this page if logged in
    if (!this.props.loggedIn)
      this.setState({ redirect: <Redirect to="/login" /> });

    // If on mobile, only displayed recommended section
    if (window.innerWidth < 768) this.setState({ showData: false });
  }

  // Handles changing the view on mobile
  changeView() {
    if (window.innerWidth < 768) {
      this.setState({ showData: !this.state.showData });
      this.setState({ showRec: !this.state.showRec });
    }
  }

  render() {
    return (
      <div className="flex flex-col w-screen md:w-full h-full justify-center items-center">
        {this.state.redirect}
        <Nav connect={this.props.connect} />
        <div className="flex h-full w-screen relative overflow-hidden">
          <Recommended show={this.state.showRec} changeView={this.changeView} />
          <DataDisplay
            show={this.state.showData}
            changeView={this.changeView}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Unlocked);
