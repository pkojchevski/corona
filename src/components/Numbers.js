import React, { useState } from "react";

import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-train-station.css";

function Numbers({ red, orange, green }) {

  return (
    <div className="numbers">
      <div className="orange">
        <Odometer format="dddddd" duration={500} value={orange} />
      </div>
      {/* <div className="green">
        <Odometer format="d" duration={500} value={ReactDOM} />
      </div> */}
      <div className="red">
        <Odometer format="d" duration={500} value={red} />
      </div>
    </div>
  );
}

export default Numbers;
