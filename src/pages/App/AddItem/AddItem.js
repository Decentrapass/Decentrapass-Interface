import React, { Component } from "react";
import { connect } from "react-redux";
import AddDataField from "./DataCreate/AddDataField";
import { IF } from "../../../components/Constants/AddInterfaces";
import { encrypt } from "../../../functions/encryption";
import {
  changeItem,
  changePage,
  saveItems,
  saveTx,
} from "../../../state/actions";
import { TYPES_INT } from "../../../components/Constants/constants";
import { formatItem, formatSend } from "../../../functions/format";
import { Redirect } from "react-router-dom";

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
    changePage: (page) => dispatch(changePage(page)),
    changeItem: (item) => dispatch(changeItem(item)),
    saveItems: (data) => dispatch(saveItems(data)),
    saveTx: (data) => dispatch(saveTx(data)),
  };
};

class AddItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
    };

    this.stateChanger = this.stateChanger.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  stateChanger(name, val) {
    this.setState({ [name]: val }); // Saves input values on state
  }

  componentDidMount() {
    if (this.props.addingItem === null) {
      this.setState({ redirect: <Redirect to="/app/unlocked" /> });
    }
  }

  async handleSubmit() {
    let type = TYPES_INT[this.props.addingItem];
    let data = [];

    for (const i of Object.keys(IF[this.props.addingItem])) {
      data.push(this.state[i] || ""); // If null set to empty string (avoid errors)
    }

    let nextId = await this.props.contract.methods
      .numObjects(this.props.account)
      .call();
    let newItem = formatItem(type, data, this.props.items.length, nextId);

    this.props.saveItems(this.props.items.concat([newItem]));
    this.props.changeItem(newItem);

    let toSend = await formatSend(encrypt(data, this.props.password));

    let res = await ipfs.add(toSend);

    this.props.contract.methods
      .saveObject(type, nextId, res.path)
      .send({ from: this.props.account })
      .on(
        "transactionHash",
        function (hash) {
          this.props.saveTx(hash);
        }.bind(this)
      );

    this.setState({ redirect: <Redirect to="/app/unlocked" /> });
  }

  render() {
    return (
      <>
        {this.state.redirect}
        <div className="flex flex-col relative bg-green-50 dark:bg-gray-900 w-full h-full justify-end items-center pb-24">
          <div className="flex flex-col justify-start items-center cursor-pointer w-2/3 h-5/6">
            <div className="overflow-y-auto w-full mb-10 border border-solid border-gray-400 dark:border-gray-200 p-8 rounded-xl">
              {this.props.addingItem &&
                Object.keys(IF[this.props.addingItem]).map((el, key) => {
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
              <button
                className="w-48 py-2 bg-red-300 border-2 border-red-500 dark:border-red-600 dark:bg-red-800 hover:bg-red-500 dark:hover:bg-red-600 text-xl text-white"
                onClick={() =>
                  this.setState({
                    redirect: <Redirect to="/app/unlocked" />,
                  })
                }
              >
                Cancel
              </button>
              <button
                className="w-48 py-2 bg-green-300 border-2 border-green-500 dark:border-green-600 dark:bg-green-800 hover:bg-green-500 dark:hover:bg-green-600 text-xl text-white"
                onClick={this.handleSubmit}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
