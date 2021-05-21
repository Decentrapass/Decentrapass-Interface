import React, { Component } from "react";
import {
  NormalField,
  HiddenField,
  LargeField,
  DateField,
  SelectField,
} from "./CreateFields";

export default class AddDataField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: null,
    };
  }

  componentDidMount() {
    this.setState({ fields: this.chooseType() });
  }

  chooseType() {
    switch (this.props.fieldType) {
      case "normal":
        return (
          <NormalField
            stateChanger={this.props.stateChanger}
            fieldLabel={this.props.fieldLabel}
            filledWith={this.props.filledWith}
          />
        );
      case "hidden":
        return (
          <HiddenField
            stateChanger={this.props.stateChanger}
            fieldLabel={this.props.fieldLabel}
            filledWith={this.props.filledWith}
          />
        );
      case "date":
        return (
          <DateField
            stateChanger={this.props.stateChanger}
            fieldLabel={this.props.fieldLabel}
            filledWith={this.props.filledWith}
          />
        );
      case "select":
        return (
          <SelectField
            stateChanger={this.props.stateChanger}
            elementType={this.props.elementType}
            fieldLabel={this.props.fieldLabel}
            filledWith={this.props.filledWith}
          />
        );
      case "large":
        return (
          <LargeField
            stateChanger={this.props.stateChanger}
            fieldLabel={this.props.fieldLabel}
            filledWith={this.props.filledWith}
          />
        );
      default:
        return (
          <NormalField
            stateChanger={this.props.stateChanger}
            fieldLabel={this.props.fieldLabel}
            filledWith={this.props.filledWith}
          />
        );
    }
  }

  render() {
    return (
      <div className="flex flex-col w-full mb-5">
        <span className="dark:text-white text-xl mb-1">
          {this.props.fieldName}
        </span>
        {this.state.fields}
      </div>
    );
  }
}
