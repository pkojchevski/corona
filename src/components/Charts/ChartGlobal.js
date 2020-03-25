import React from "react";
import {
  BarChart,
  Bar,
  Label,
  XAxis,
  YAxis,
  Text,
  CartesianGrid,
  Tooltip,
  LabelList
} from "recharts";

const ChartGlobal = ({ red, green, orange, daily }) => {
  console.log("orange:", orange);
  return (
    <div className="chart bar-chart">
      <BarChart
        width={350}
        height={200}
        data={
          orange &&
          [...orange]
            .sort((a, b) =>
              daily ? +b.dailyTotal - +a.dailyTotal : +b.total - +a.total
            )
            .splice(0, 10)
        }
      >
        <CartesianGrid strokeDasharray="5 5" />

        <XAxis
          dataKey="countryId"
          interval={0}
          angle={-45}
          textAnchor="end"
          tick={{ fontSize: 12 }}
        />
        <Tooltip />
        {daily ? (
          <Bar dataKey="dailyTotal" fill="orange" />
        ) : (
          <Bar dataKey="total" fill="orange" />
        )}
      </BarChart>
    </div>
  );
};

export default ChartGlobal;
