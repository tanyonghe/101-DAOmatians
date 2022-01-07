import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Time A",
    For: 25,
    Against: 2,
  },
  {
    name: "Time B",
    For: 35,
    Against: 5,
  },
  {
    name: "Time C",
    For: 47,
    Against: 9,
  },
  {
    name: "Time D",
    For: 59,
    Against: 17,
  },
  {
    name: "Time E",
    For: 76,
    Against: 22,
  },
  {
    name: "Time F",
    For: 97,
    Against: 26,
  },
  {
    name: "Time G",
    For: 134,
    Against: 31,
  }
];

export function VotesChart() {
  return (
    <LineChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="For"
        stroke="#82ca9d"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="Against" stroke="#f9a597" />
    </LineChart>
  );
}