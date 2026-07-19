import React from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

export default function Analysis() {
  const data = [
    { name: "Completed", value: 10 },
    { name: "Pending", value: 5 },
  ];

  return (
    <div>
      <h2>Analysis</h2>
      <BarChart width={400} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value" />
      </BarChart>
    </div>
  );
}
