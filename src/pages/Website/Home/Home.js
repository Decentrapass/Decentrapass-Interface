import React, { Component } from "react";
import InfoIcons from "./InfoIcons";
import Landing from "./Landing";
import Platforms from "./Platforms";
import TheSafeToken from "./TheSafeToken";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="flex flex-col" id="home">
        <Landing />
        <InfoIcons />
        <TheSafeToken />
        <Platforms />
      </div>
    );
  }
}

export default Home;
