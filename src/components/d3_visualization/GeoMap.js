import React, { useState } from "react";

import GeoChart from "./GeoChart";

const GeoMap = ({ data, property }) => {
  // const [property, setProperty] = useState("pop_est");
  return <GeoChart data={data} property={property} />;
};

export default GeoMap;
