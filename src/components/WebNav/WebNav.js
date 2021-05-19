import { Component } from "react";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="w-full bg-green-500 p-4 flex">
        <a className="text-green-800 mx-5" href="/app/login">
          Go to app
        </a>
        <a
          className="text-green-800 mx-5"
          href="https://github.com/danimelchor/no-pass"
        >
          Go to docs
        </a>
      </div>
    );
  }
}

export default Nav;
