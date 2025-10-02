import React from "react";
import {BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer,} from "recharts";

function Chart({ skills }) {
  return (
    <div style={{ width: "100%", height: 300 }} >
      <ResponsiveContainer>
        <BarChart data={skills}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="skillName" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="progress" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
