import { Component } from "react";

export class NormalField extends Component {
  state = {
    val: "",
  };

  componentDidMount() {
    this.setState({ val: this.props.filledWith || "" });
    this.props.stateChanger(this.props.fieldLabel, this.props.filledWith);
  }

  render() {
    return (
      <input
        type="text"
        placeholder="new field..."
        className="w-full border-2 dark:text-white bg-gray-300 dark:bg-gray-800 border-gray-400 dark:border-gray-800 text-xl px-3 py-2 focus:outline-none focus:border-blue-500"
        onChange={(e) => {
          this.setState({ val: e.target.value });
          this.props.stateChanger(this.props.fieldLabel, e.target.value);
        }}
        value={this.state.val}
      />
    );
  }
}

export class HiddenField extends Component {
  state = {
    val: "",
  };

  componentDidMount() {
    this.setState({ val: this.props.filledWith || "" });
    this.props.stateChanger(this.props.fieldLabel, this.props.filledWith);
  }

  render() {
    return (
      <input
        type="text"
        placeholder="new field..."
        className="w-full border-2 dark:text-white bg-gray-300 dark:bg-gray-800 border-gray-400 dark:border-gray-800 text-xl px-3 py-2 focus:outline-none focus:border-blue-500 passwordField"
        onChange={(e) => {
          this.setState({ val: e.target.value });
          this.props.stateChanger(this.props.fieldLabel, e.target.value);
        }}
        value={this.state.val}
      />
    );
  }
}

export class LargeField extends Component {
  state = {
    val: "",
  };

  componentDidMount() {
    this.setState({ val: this.props.filledWith || "" });
    this.props.stateChanger(this.props.fieldLabel, this.props.filledWith);
  }

  render() {
    return (
      <textarea
        placeholder="new field..."
        className="w-full h-32 border-2 dark:text-white bg-gray-300 dark:bg-gray-800 border-gray-400 dark:border-gray-800 text-xl px-3 py-2 focus:outline-none focus:border-blue-500"
        onChange={(e) => {
          this.setState({ val: e.target.value });
          this.props.stateChanger(this.props.fieldLabel, e.target.value);
        }}
        value={this.state.val}
      />
    );
  }
}

export class DateField extends Component {
  state = {
    text: "",
  };

  componentDidMount() {
    this.setState({ text: this.props.filledWith || "" });
    this.props.stateChanger(this.props.fieldLabel, this.props.filledWith);
  }

  handleChange = (e) => {
    if (e.target.value.length === 2) {
      this.setState({ text: e.target.value + "/" }, () =>
        this.props.stateChanger(this.props.fieldLabel, e.target.value + "/")
      );
    } else {
      this.setState({ text: e.target.value }, () =>
        this.props.stateChanger(this.props.fieldLabel, e.target.value)
      );
    }
  };

  render() {
    return (
      <input
        type="text"
        placeholder="mm/yyyy"
        className="w-full border-2 dark:text-white bg-gray-300 dark:bg-gray-800 border-gray-400 dark:border-gray-800 text-xl px-3 py-2 focus:outline-none focus:border-blue-500"
        onChange={this.handleChange}
        value={this.state.text}
        maxLength="7"
      />
    );
  }
}

export class SelectField extends Component {
  state = {
    options: null,
    loaded: false,
  };

  componentDidMount() {
    this.setState({ options: this.getOptions() });
  }

  generate(arr) {
    let result = arr.map((el) => {
      if (this.props.filledWith === el) return <option selected>{el}</option>;
      else return <option>{el}</option>;
    });

    if (this.props.filledWith)
      this.props.stateChanger(this.props.fieldLabel, this.props.filledWith);

    return result;
  }

  getOptions() {
    let arr = [];
    switch (this.props.elementType) {
      case "card":
        arr = [
          "Visa",
          "Mastercard",
          "American Express",
          "Diners Club",
          "Carte Balanche",
          "Discover",
          "JCB",
          "Maestro",
          "Visa Electron",
          "Laser",
          "Union Pay",
        ];
        break;
      default:
        break;
    }

    this.props.stateChanger(this.props.fieldLabel, arr[0]);
    return this.generate(arr);
  }

  render() {
    return (
      <select
        className="w-full border-2 dark:text-white bg-gray-300 dark:bg-gray-800 border-gray-400 dark:border-gray-800 text-xl px-3 py-2 focus:outline-none focus:border-blue-500"
        onChange={(e) =>
          this.props.stateChanger(this.props.fieldLabel, e.target.value)
        }
      >
        {this.state.options}
      </select>
    );
  }
}
