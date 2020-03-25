import React from "react";

import HistoryChart from "./HistoryChart";

const Charts = ({ country }) => {
  return (
    <div>
      <HistoryChart country={country} />
    </div>
  );
};

export default Charts;
