import React from "react";


export default function MonthlySummary({ overallPercent = 0, activeHabits = 0, totalDone = 0 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div className="bg-gray-800 p-4 rounded-xl shadow">
        <div className="text-sm text-gray-300">Monthly Completion</div>
        <div className="text-3xl font-bold mt-2">{Math.round(overallPercent)}%</div>
        <div className="w-full bg-gray-700 h-2 rounded mt-3">
          <div className="h-2 rounded bg-green-500" style={{ width: `${overallPercent}%` }} />
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl shadow">
        <div className="text-sm text-gray-300">Active Habits</div>
        <div className="text-3xl font-bold mt-2">{activeHabits}</div>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl shadow">
        <div className="text-sm text-gray-300">Completed (month)</div>
        <div className="text-3xl font-bold mt-2">{totalDone}</div>
      </div>
    </div>
  );
}
