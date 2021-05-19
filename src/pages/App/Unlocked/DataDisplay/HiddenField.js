import React, { Component } from "react";

export default class NormalField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revealed: false, // For password fields
    };

    this.copyData = this.copyData.bind(this);
  }

  copyData() {
    // Copys data to clipboard
    navigator.clipboard.writeText(this.props.fieldValue);
  }

  render() {
    return (
      <div
        className="data-field flex w-full items-center border-t border-solid bg-white border-gray-300 dark:border-gray-700 h-16 cursor-pointer relative"
        style={this.props.first ? { border: "0 none" } : {}}
      >
        <div className="flex flex-col justify-center h-full w-full px-4 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900">
          <span className="text-green-600 text-sm h-1/4">
            {this.props.fieldName}
          </span>
          <span
            className="text-lg dark:text-white h-2/4"
            style={
              // Decides if password is hidden
              !this.state.revealed ? { WebkitTextSecurity: "disc" } : {}
            }
          >
            {this.props.fieldValue}
          </span>
        </div>
        <div className="absolute right-0 hidden w-2/6 h-full justify-end tools">
          <div
            className="text-md block text-green-500 w-1/2 flex items-center justify-center h-full border-l border-gray-300 dark:border-gray-600 border-solid bg-white hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900"
            onClick={() => this.setState({ revealed: !this.state.revealed })}
          >
            <p>reveal</p>
          </div>
          <div
            className="text-md block text-green-500 w-1/2 flex items-center justify-center h-full border-l border-gray-300 dark:border-gray-600 border-solid bg-white hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900"
            onClick={this.copyData}
          >
            <p>copy</p>
          </div>
        </div>
      </div>
    );
  }
}
