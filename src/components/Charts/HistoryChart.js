import React, { useEffect, useState } from "react";
import { useCoronaGlobalValues } from "../../context";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

const HistoryChart = ({ country }) => {
  const { coronaGlobal } = useCoronaGlobalValues();
  const [historyChartData, setHistoryChartData] = useState([]);

  useEffect(() => {
    setHistoryChartData(
      [...coronaGlobal]
        .filter(item => {
          return (
            item.Country.toLowerCase().trim() === country.toLowerCase().trim()
          );
        })
        .map(obj => {
          let history = [];
          Object.keys(obj).map(key => {
            if (key.includes("date")) {
              history.push({
                name: key.slice(0, 4),
                day: key.slice(4, key.length - 1),
                value: +obj[key]
              });
            }
          });
          return history;
        })
        .flat()
        .filter(item => item.value !== 0)
    );
  }, []);

  return (
    <div>
      {historyChartData && historyChartData.length === 0 ? (
        <h3 style={{ textAlign: "center", marginLeft: "1rem" }}>
          There is no data available for this country!
        </h3>
      ) : (
        <div>
          <LineChart
            width={350}
            height={250}
            data={historyChartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" tick={false} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default HistoryChart;
