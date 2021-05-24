import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import AddDataField from "../AddItem/DataCreate/AddDataField";
import GuestTriedAction from "../../components/Popups/GuestTriedAction";

// Constants
import { IF } from "../../components/Constants/AddInterfaces";
import { TYPES_INT } from "../../components/Constants/constants";

// Functions
import { encrypt } from "../../functions/encryption";
import { changeItem, saveItems, saveTx } from "../../state/actions";
import { formatItem, formatSend } from "../../functions/format";
import { Redirect } from "react-router-dom";

// IPFS Connection
const { create } = require("ipfs-http-client");
const ipfs = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const mapStateToProps = (state) => {
  return {
    addingItem: state.addingItem,
    account: state.account,
    contract: state.contract,
    items: state.items,
    password: state.password,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeItem: (item) => dispatch(changeItem(item)),
    saveItems: (data) => dispatch(saveItems(data)),
    saveTx: (data) => dispatch(saveTx(data)),
  };
};

class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      render: null,
    };

    this.stateChanger = this.stateChanger.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // When user types in field we set parents state
  stateChanger(name, val) {
    this.setState({ [name]: val });
  }

  // Only create item if interface was provided
  componentWillMount() {
    if (this.props.addingItem === null) {
      this.setState({ render: <Redirect to="/unlocked" /> });
    }
  }

  // When user clicks "save"
  async handleSubmit() {
    // Guests cant create item > error popup
    if (this.props.account !== "guest") {
      let type = TYPES_INT[this.props.addingItem];
      let data = [];

      // Creating an array with the fields
      for (const i of Object.keys(IF[this.props.addingItem])) {
        data.push(this.state[i] || ""); // If null set to empty string (avoid errors)
      }

      // Getting the number of items the user has to set appropiate id
      let nextId = await this.props.contract.methods
        .numObjects(this.props.account)
        .call();

      // Format item into string to save to state
      let newItem = formatItem(type, data, this.props.items.length, nextId);

      this.props.saveItems(this.props.items.concat([newItem]));
      this.props.changeItem(newItem);

      // Format encrypted item to save to IPFS
      let toSend = await formatSend(encrypt(data, this.props.password));

      let res = await ipfs.add(toSend);

      // Save response hash to contract
      this.props.contract.methods
        .saveObject(type, nextId, res.path)
        .send({ from: this.props.account })
        .on(
          "transactionHash",
          function (hash) {
            // Save txs to pending txs menu
            this.props.saveTx(hash);
          }.bind(this)
        );
      this.setState({ render: <Redirect to="/unlocked" /> });
    } else {
      // Display error popup when guest
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
              {this.props.addingItem &&
                Object.keys(IF[this.props.addingItem]).map((el, key) => {
                  // Displays the appropiate inputs for each field
                  return (
                    <AddDataField
                      key={key}
                      fieldLabel={el}
                      fieldName={IF[this.props.addingItem][el][0]}
                      fieldType={IF[this.props.addingItem][el][1]}
                      elementType={this.props.addingItem}
                      stateChanger={this.stateChanger}
                    />
                  );
                })}
            </div>
            <div className="flex justify-between w-full">
              {/* CANCEL BUTTON */}
              <button
                className="w-48 py-2 bg-red-300 border-2 border-red-500 dark:border-red-600 dark:bg-red-800 hover:bg-red-500 dark:hover:bg-red-600 text-xl text-white"
                onClick={() =>
                  this.setState({
                    render: <Redirect to="/unlocked" />,
                  })
                }
              >
                Cancel
              </button>

              {/* SAVE BUTTON */}
              <button
                className="w-48 py-2 bg-green-300 border-2 border-green-500 dark:border-green-600 dark:bg-green-800 hover:bg-green-500 dark:hover:bg-green-600 text-xl text-white"
                onClick={(e) => {
                  e.target.setAttribute("disabled", "disabled");
                  this.handleSubmit();
                }}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
