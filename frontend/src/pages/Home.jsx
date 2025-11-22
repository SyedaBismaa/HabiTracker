import React from "react";
import DashboardLayout from "../layout/DashboardLayout";

const Home = () => {
  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar / Navbar */}
      <DashboardLayout />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 space-y-6 overflow-y-auto">

        {/* ===== HEADER ===== */}
        <div>
          <h1 className="text-3xl font-bold mb-1">Habit Overview</h1>
          <p className="text-gray-300 text-sm">Your weekly & monthly habit performance</p>
        </div>

        {/* ===== TOP STATS CARDS ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Weekly Completion */}
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h3 className="font-medium text-gray-300">Weekly Completion</h3>
            <div className="text-4xl font-bold mt-2">72%</div>
            <div className="w-full bg-gray-700 h-2 rounded mt-3">
              <div className="bg-green-500 h-2 w-[72%] rounded"></div>
            </div>
          </div>

          {/* Active Habits */}
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h3 className="font-medium text-gray-300">Active Habits</h3>
            <div className="text-4xl font-bold mt-2">6</div>
          </div>

          {/* Longest Streak */}
          <div className="bg-gray-800 p-4 rounded-xl shadow">
            <h3 className="font-medium text-gray-300">Longest Streak</h3>
            <div className="text-4xl font-bold mt-2">14 days</div>
          </div>
        </div>

        {/* ===== CIRCLE PROGRESS SECTION ===== */}
        <div className="bg-gray-800 p-6 rounded-xl shadow w-full flex flex-col sm:flex-row items-center justify-between">
          <div className="flex flex-col gap-2 mb-6 sm:mb-0">
            <h2 className="text-xl font-semibold">Monthly Goal Progress</h2>
            <p className="text-gray-400 text-sm">You're improving this month, keep going!</p>
          </div>

          <div className="relative w-40 h-40">
            <svg className="w-full h-full rotate-[-90deg]">
              <circle cx="80" cy="80" r="70" stroke="#374151" strokeWidth="12" fill="none" />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#10B981"
                strokeWidth="12"
                fill="none"
                strokeDasharray={440}
                strokeDashoffset={440 - (440 * 68) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl">68%</div>
          </div>
        </div>

        {/* ===== HABIT CALENDAR SECTION ===== */}
        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Habit Calendar</h2>
          <p className="text-gray-400 text-sm mb-3">Track day-by-day performance</p>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-2 text-center text-gray-300 mb-2">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>

          {/* Days Box */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-lg border border-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-700 ${
                  i % 3 === 0 ? "bg-green-600" : "bg-gray-900"
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* ===== WEEKLY BREAKDOWN ===== */}
        <div className="bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-3">Weekly Breakdown</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Week 1', 'Week 2', 'Week 3'].map((week) => (
              <div key={week} className="p-4 bg-gray-900 rounded-lg shadow space-y-2">
                <h3 className="font-medium">{week}</h3>
                <p className="text-gray-400 text-sm">Completion: 60%</p>
                <div className="w-full bg-gray-700 h-2 rounded">
                  <div className="bg-blue-500 h-2 w-[60%] rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
