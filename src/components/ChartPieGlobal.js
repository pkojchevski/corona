import React, { useState, useEffect } from "react";

import { PieChart, Pie, Sector, Cell } from "recharts";
import { useCoronaGlobalValues } from "../context";

function ChartPieGlobal() {
  const {
    coronaGlobal,
    coronaGlobalGreen,
    coronaGlobalRed,
    globalTotal,
    globalGreenTotal,
    globalRedTotal
  } = useCoronaGlobalValues();
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("piechart");
    if (globalTotal && globalRedTotal && globalGreenTotal) {
      setData([
        {
          name: "green",
          value: globalGreenTotal
        },
        {
          name: "orange",
          value: globalTotal
        },
        {
          name: "red",
          value: globalRedTotal
        }
      ]);
    }
  }, [globalTotal, globalGreenTotal, globalRedTotal]);

  console.log("data:", data);

  const COLORS = ["green", "orange", "red"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className="chart pie-chart">
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={110}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
}

export default ChartPieGlobal;
