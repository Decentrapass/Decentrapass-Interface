import React, { Component } from "react";
import InfoIconItem from "./InfoIconItem";
import { ITEM } from "./InfoIconText";

export default class InfoIcons extends Component {
  render() {
    return (
      <div className="flex items-center justify-center w-full mb-48">
        <div className="flex flex-col lg:grid grid-cols-3 lg:gap-6 2xl:gap-16 w-4/5 2xl:w-3/5 justify-start items-start">
          <InfoIconItem item={ITEM[0]} />
          <InfoIconItem item={ITEM[1]} />
          <InfoIconItem item={ITEM[2]} />
          <InfoIconItem item={ITEM[3]} />
          <InfoIconItem item={ITEM[4]} />
          <InfoIconItem item={ITEM[5]} />
        </div>
      </div>
    );
  }
}
