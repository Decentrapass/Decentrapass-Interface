import { Component } from "react";

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="text-5xl flex w-full h-full items-center justify-center">
        <div className="w-1/3 text-center leading-relaxed dark:text-white">
          Whoops! Looks like the page you were looking for doesn't exist.{" "}
          <a href="/" className="text-green-500 hover:underline">
            Go back!
          </a>
        </div>
      </div>
    );
  }
}

export default NotFound;
