import React from "react";
import { Peer } from "@components/svg";
import "./index.css";

//loading sipnner
const LoadingSpinner = (props) => {
  return (
    <div
      className={`${
        props.asOverlay && "loading-spinner__overlay z-[999999999]"
      }`}
    >
      <div className="text-center ">
        {/* <div className="lds-dual-ring"></div> */}
        <Peer />
      </div>
    </div>
  );
};

export default LoadingSpinner;
