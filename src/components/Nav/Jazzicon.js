import React, { Component } from "react";

var jazzicon = require("jazzicon");

// The Jazzicon module returns an HTMLElement that must be
// injected directly into html, to make it simple we create an element that does this automatically
export default class Jazzicon extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    var dv = jazzicon(20, parseInt(this.props.account.substring(2, 10), 16));

    if (document.getElementById("jazzicon")) {
      document.getElementById("jazzicon").innerHTML = "";
      document.getElementById("jazzicon").appendChild(dv);
    }
  }

  render() {
    return (
      <div
        id="jazzicon"
        className={
          "flex items-center justify-center " + this.props.addedClasses
        }
      ></div>
    );
  }
}
