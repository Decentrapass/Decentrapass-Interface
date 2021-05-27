import React, { Component } from "react";

// Functions
import { connect } from "react-redux";
import { encrypt } from "../../functions/encryption";
import { changeItem, saveItems, saveTx } from "../../state/actions";
import { formatItem, formatSend } from "../../functions/format";

// Components
import AddDataField from "../AddItem/DataCreate/AddDataField";
import { Redirect } from "react-router";
import GuestTriedAction from "../../components/Popups/GuestTriedAction";

// Constants
import { IF } from "../../components/Constants/AddInterfaces";
import { TYPES_INT } from "../../components/Constants/constants";
import { checkExtensionReq } from "../../functions/extensionInteractions";

// IPFS Connection
const { create } = require("ipfs-http-client");
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const mapStateToProps = (state) => {
  return {
    currentItem: state.currentItem,
    items: state.items,
    password: state.password,
    contract: state.contract,
    account: state.account,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeItem: (item) => dispatch(changeItem(item)),
    saveItems: (items) => dispatch(saveItems(items)),
    saveTx: (tx) => dispatch(saveTx(tx)),
  };
};

class EditItem extends Component {
  state = {
    fields: null,
  };

  constructor(props) {
    super(props);

    this.stateChanger = this.stateChanger.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Displays right fields filled with previous data
  componentDidMount() {
    console.log(this.props.currentItem);

    // If no pre-declared type or query from extension > redirect
    if (this.props.currentItem === null) {
      this.setState({ render: <Redirect to="/unlocked" /> });
      return;
    }

    var fields = IF[this.props.currentItem.type];
    var fieldsHtml = Object.keys(fields).map((el) => {
      return (
        <AddDataField
          fieldLabel={el}
          fieldName={IF[this.props.currentItem.type][el][0]}
          fieldType={IF[this.props.currentItem.type][el][1]}
          elementType={this.props.currentItem.type}
          stateChanger={this.stateChanger}
          filledWith={this.props.currentItem[el]}
        />
      );
    });

    this.setState({ fields: fieldsHtml });
  }

  // When user types > save parents state
  stateChanger(name, val) {
    if (name === "number") val.replace(/ /g, "");
    this.setState({ [name]: val }); // Saves input values on state
  }

  async handleSubmit() {
    // Guests cant save items
    if (this.props.account !== "guest") {
      // Get interface from type
      var fields = IF[this.props.currentItem.type];

      let type = TYPES_INT[this.props.currentItem.type];
      let data = [];

      // Create an array with fields data
      for (const i of Object.keys(fields)) {
        data.push(this.state[i] || ""); // If null set to empty string (avoid errors)
      }

      // Remove previous item from state and save edited one
      let prevItems = this.props.items;
      prevItems[this.props.currentItem.numId] = formatItem(
        type,
        data,
        this.props.currentItem.numId,
        this.props.currentItem.id
      );
      this.props.saveItems(prevItems);
      this.props.changeItem(prevItems[this.props.currentItem.numId]);

      // Encrypt new data and send to IPFS
      let toSend = formatSend(encrypt(data, this.props.password));

      let res = await ipfs.add(toSend);

      // Save IPFS response hash to contract
      this.props.contract.methods
        .editObject(this.props.currentItem.id, res.path)
        .send({ from: this.props.account })
        .on(
          "transactionHash",
          function (hash) {
            this.props.saveTx(hash);
          }.bind(this)
        );

      this.setState({ render: <Redirect to="/unlocked" /> });
    } else {
      // Display error popup when guest tried to save
      this.setState({
        render: (
          <GuestTriedAction onClose={() => this.setState({ render: null })} />
        ),
      });
    }
  }

  render() {
    return (
      <>
        {this.state.render}
        <div className="flex flex-col relative bg-green-50 dark:bg-gray-900 w-full h-full justify-end items-center pb-24">
          <div className="flex flex-col justify-start items-center cursor-pointer w-2/3 h-5/6">
            <div className="overflow-y-auto w-full mb-10 border border-solid border-gray-400 dark:border-gray-200 p-8 rounded-xl">
              {this.state.fields}
            </div>
            <div className="flex w-full justify-between dark:text-white">
              <button
                className="bg-red-300 border-2 border-red-500 dark:border-red-600 dark:bg-red-800 py-2 w-48 hover:bg-red-500 dark:hover:bg-red-600 cursor-pointer text-xl"
                onClick={() =>
                  this.setState({
                    render: <Redirect to="/unlocked" />,
                  })
                }
              >
                Cancel
              </button>
              <button
                className="bg-green-300 border-2 border-green-500 dark:border-green-600 dark:bg-green-800 py-2 w-48 hover:bg-green-500 dark:hover:bg-green-600 cursor-pointer text-xl"
                onClick={this.handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItem);
