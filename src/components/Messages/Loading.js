import { Component } from "react";

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="w-full h-full z-50 bg-green-500 dark:bg-gray-900 flex justify-center items-center">
        <div className="spinner"></div>
      </div>
    );
  }
}

export default Loading;
