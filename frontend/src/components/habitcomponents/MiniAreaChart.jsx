import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/**
 * MiniAreaChart
 * props:
 *  - data: [{ date: '2025-11-01', pct: 40 }, ...]  (date string and pct 0-100)
 */
export default function MiniAreaChart({ data = [] }) {
  // simple formatting for the x-axis: show day only
  const formatted = data.map((d) => ({ ...d, day: d.date.slice(8, 10) }));

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow">
      <div className="text-sm text-gray-300 mb-2">Daily Completion</div>
      <div style={{ width: "100%", height: 160 }}>
        <ResponsiveContainer>
          <AreaChart data={formatted}>
            <CartesianGrid stroke="#2b2f36" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fill: "#9CA3AF", fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: "#111827", border: "1px solid #374151", color: "#fff" }}
              formatter={(value) => `${value}%`}
            />
            <Area
              type="monotone"
              dataKey="pct"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.12}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
