import React, { Component } from "react";

export default class MediumField extends Component {
  constructor(props) {
    super(props);

    this.copyData = this.copyData.bind(this);
  }

  copyData() {
    // Copys data to clipboard
    navigator.clipboard.writeText(this.props.fieldValue);
  }

  render() {
    return (
      <div
        className="data-field flex w-full items-center border-t border-solid bg-white border-gray-300 dark:border-gray-700 h-32 cursor-pointer relative"
        style={this.props.first ? { border: "0 none" } : {}}
      >
        <div className="flex flex-col justify-start h-full w-full p-4 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900">
          <span className="text-green-600 text-sm">{this.props.fieldName}</span>
          <div className="text-lg dark:text-white overflow-y-auto">
            {this.props.fieldValue}
          </div>
        </div>
        <div className="absolute right-0 hidden w-1/6 h-full justify-end tools">
          <div
            className="text-md block text-green-500 w-full flex items-center justify-center h-full border-l border-gray-300 dark:border-gray-600 border-solid bg-white hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-900"
            onClick={this.copyData}
          >
            <p>copy</p>
          </div>
        </div>
      </div>
    );
  }
}
