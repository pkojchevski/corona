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
import { useCoronaGlobalValues } from "../context";

const ChartGlobal = () => {
  const { coronaGlobal } = useCoronaGlobalValues();
  const ticks = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180];
  return (
    <div className="chart bar-chart">
      <BarChart
        width={350}
        height={300}
        data={
          coronaGlobal &&
          [...coronaGlobal].sort((a, b) => b.total - a.total).splice(0, 10)
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
        <Bar dataKey="total" fill="#8884d8" />
        {/* <LabelList dataKey="total" position="top" /> */}
      </BarChart>
    </div>
  );
};

export default ChartGlobal;
