import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList
} from "recharts";

const ChartGlobal = ({ red, green, orange, daily }) => {
  return (
    <div className="chart bar-chart">
      {orange.length !== 0 && (
        <ResponsiveContainer
          width="100%"
          height={orange.length * 20 + 50}
          // style={{ minHeight: "500px" }}
          // aspect={3.0 / 3.0}
          // height='1000px'
        >
          <BarChart
            data={
              orange &&
              [...orange]
                .sort((a, b) =>
                  daily ? +b.dailyTotal - +a.dailyTotal : +b.total - +a.total
                )
                .filter(el => +el.dailyTotal > 10)
            }
            layout={"vertical"}
          >
            <CartesianGrid strokeDasharray="5 5" />

            <XAxis
              // dataKey="dailyTotal"
              interval={0}
              tick={{ fontSize: 12 }}
              type={"number"}
              orientation={"top"}
              // label={{ value: "pv of page", angle: -90, position: "insideLeft" }}
            />
            <YAxis
              angle={-45}
              textAnchor="end"
              type={"category"}
              orientation={"left"}
              dataKey="Country"
              tick={{ fontSize: 10 }}
            />
            <Tooltip />
            {daily ? (
              <Bar dataKey="dailyTotal" fill="orange">
                <LabelList
                  dataKey="dailyTotal"
                  position="center"
                  // angle={90}
                  style={{
                    fontSize: 10,
                    textAlign: "center",
                    fontWeight: "bold"
                  }}
                />
              </Bar>
            ) : (
              <Bar dataKey="total" fill="orange" />
            )}
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ChartGlobal;
