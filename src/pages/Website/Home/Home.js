import React, { Component } from "react";
import InfoIcons from "./InfoIcons";
import Landing from "./Landing";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="h-full" id="home">
        <Landing />
        <InfoIcons />
      </div>
    );
  }
}

export default Home;
