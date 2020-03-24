import React from "react";

import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-train-station.css";

import { useCoronaGlobalValues } from "../context";

function Numbers() {
  const {
    globalTotal,
    globalRedTotal,
    globalGreenTotal
  } = useCoronaGlobalValues();
  return (
    <div className="numbers">
      <div className="orange">
        <Odometer format="dddddd" duration={500} value={globalTotal} />
      </div>
      <div className="green">
        <Odometer format="d" duration={500} value={globalGreenTotal} />
      </div>
      <div className="red">
        <Odometer format="d" duration={500} value={globalRedTotal} />
      </div>
    </div>
  );
}

export default Numbers;
