import { Component } from "react";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="w-full h-full absolute top-0 left-0 bg-green-500 dark:bg-gray-900 flex justify-center items-center z-40">
        <div className="spinner"></div>
      </div>
    );
  }
}

export default Loading;
