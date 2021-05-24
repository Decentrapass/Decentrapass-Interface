import { Component } from "react";

// Loading screen is displayed when some interface needs to load
class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="w-full h-full absolute top-0 left-0 bg-green-200 dark:bg-gray-900 flex flex-col justify-center items-center z-40">
        <div className="spinner"></div>
        <h1 className="text-xl mt-3 dark:text-white">Loading...</h1>
        <p className="text-base mt-6 dark:text-white">
          Did the page get stuck?{" "}
          <span
            className="text-green-800 dark:text-green-500 cursor-pointer hover:underline py-5 font-black"
            onClick={() => window.location.reload()}
          >
            Reload!
          </span>
        </p>
      </div>
    );
  }
}

export default Loading;
