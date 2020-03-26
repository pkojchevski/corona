import React, { useState, useEffect } from "react";

import { PieChart, Pie, Cell } from "recharts";

function ChartPieGlobal({ red, green, orange }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("piechart");
    if (green && red && orange) {
      setData([
        {
          name: "green",
          value: green
        },
        {
          name: "orange",
          value: orange
        },
        {
          name: "red",
          value: red
        }
      ]);
    }
  }, [green, red, orange]);

  const COLORS = ["green", "orange", "red"];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
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

  // const renderLegend = () => {
  //   return <p>Global status.Updated on 21/03/2020 </p>;
  // };

  return (
    <div className="chart pie-chart">
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={70}
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
