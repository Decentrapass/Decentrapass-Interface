/* global chrome */

import React, { Component } from "react";

export default class FormDisplay extends Component {
  state = {
    x: -100,
    y: -100,
    display: false,
    w: 30,
    target: "",
  };

  renderInInput(e) {
    // If user clicked on input we display the extension button inside the input they clicked

    let el = e.target;
    if (el.type === "password" || el.type === "text" || el.type === "email") {
      let rect = el.getBoundingClientRect();
      // Calculating vertical align inside input and a float right
      this.setState({
        x:
          rect.left +
          window.scrollX +
          rect.width -
          this.state.w -
          (rect.height - this.state.w) / 2,
        y: rect.top + window.scrollY + (rect.height - this.state.w) / 2,
        display: true,
        target: el,
      });
    } else if (el.id !== "in-page-button") {
      this.setState({ display: false }); // Hide button
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.renderInInput.bind(this));
  }

  render() {
    return (
      <button
        id="in-page-button"
        className="form-button"
        style={{
          top: this.state.y,
          left: this.state.x,
          display: this.state.display ? "block" : "none",
          width: this.state.w,
          height: this.state.w,
        }}
      ></button>
    );
  }
}
