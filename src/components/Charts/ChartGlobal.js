import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

const ChartGlobal = ({ red, green, orange, daily }) => {
  const [final, setFinal] = useState([]);
  useEffect(() => {
    let arr = [];
    if (red && orange && red.length > 0 && orange.length > 0) {
      for (let i = 0; i < orange.length; i++) {
        arr.push({
          Country: orange[i].Country,
          totalOrange: orange[i].total,
          dailyTotalOrange: orange[i].dailyTotal,
          totalRed: red[i].total,
          dailyTotalRed: red[i].dailyTotal,
        });
      }
      setFinal(arr);
    }
  }, [red, orange]);
  return (
    <div className="chart bar-chart">
      {final.length !== 0 && daily && (
        <ResponsiveContainer
          width="100%"
          height={orange.length * 30 + 100}
        >
          <BarChart
            data={
              final.length > 0 &&
              final
                .sort((a, b) =>
                  +b.dailyTotalOrange - +a.dailyTotalOrange
                )
                .filter((el) =>
                  +el.dailyTotalOrange > 10
                )
            }
            layout={"vertical"}
          >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis
              interval={0}
              tick={{ fontSize: 12 }}
              type={"number"}
              orientation={"top"}
              domain={['dataMin', 'dataMax']}
            />
            <YAxis
              angle={-45}
              textAnchor="end"
              type={"category"}
              orientation={"left"}
              dataKey="Country"
              tick={{ fontSize: 10 }}
              interval={0}
            />
            {/* <Tooltip /> */}
            <Bar
              isAnimationActive={false}
              dataKey="dailyTotalOrange"
              fill="orange"
            >
              <LabelList
                dataKey="dailyTotalOrange"
                position="center"
                textAnchor="end"
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  transform: "translate(20px)",
                }}
                reverse
              />
            </Bar>
            <Bar
              isAnimationActive={false}
              dataKey="dailyTotalRed"
              fill="red"
            >
              <LabelList
                dataKey="dailyTotalRed"
                position="center"
                textAnchor="end"
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  transform: "translate(20px)",
                }}
                reverse
              />

            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
      {final.length !== 0 && !daily && (
        <ResponsiveContainer
          width="100%"
          height={final.length * 30 + 100}
        >
          <BarChart
            data={
              final.length > 0 &&
              final
                .sort((a, b) =>
                  +b.totalOrange - +a.totalOrange
                )
                .filter((el) =>
                  +el.totalOrange > 10
                )
            }
            layout={"vertical"}
          >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis
              interval={0}
              tick={{ fontSize: 12 }}
              type={"number"}
              orientation={"top"}
              domain={['dataMin', 'dataMax']}
            />
            <YAxis
              angle={-45}
              textAnchor="end"
              type={"category"}
              orientation={"left"}
              dataKey="Country"
              tick={{ fontSize: 10 }}
              interval={0}
            />
            {/* <Tooltip /> */}
            <Bar
              isAnimationActive={false}
              dataKey="totalOrange"
              fill="orange"
            >
              <LabelList
                dataKey="totalOrange"
                position="center"
                textAnchor="end"
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  transform: "translate(20px)",
                }}
                reverse
              />
            </Bar>
            <Bar
              isAnimationActive={false}
              dataKey="totalRed"
              fill="red"
            >
              <LabelList
                dataKey="totalRed"
                position="center"
                textAnchor="end"
                style={{
                  fontSize: 12,
                  fontWeight: "bold",
                  transform: "translate(20px)",
                }}
                reverse
              />

            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ChartGlobal;
