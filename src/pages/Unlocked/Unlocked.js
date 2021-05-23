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
      showRec: true,
      showData: true,
    };

    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    if (!this.props.loggedIn)
      this.setState({ redirect: <Redirect to="/login" /> });

    if (window.innerWidth < 740) this.setState({ showData: false });
  }

  changeView() {
    console.log(window.innerWidth);
    if (window.innerWidth < 740) {
      this.setState({ showData: !this.state.showData });
      this.setState({ showRec: !this.state.showRec });
    }
  }

  render() {
    return (
      <div className="flex flex-col w-screen lg:w-full h-full justify-center items-center">
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
