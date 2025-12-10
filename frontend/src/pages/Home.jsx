import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  Flame,
  Calendar,
  CheckCircle,
  BarChart3,
  Sparkles,
  Users,
  NotebookText,
  MessageCircle,
  ListTodo,
  HeartHandshake
} from "lucide-react";

const Home = () => {
  return (
    <DashboardLayout>
      <div className="flex-1 p-6 min-h-screen bg-gray-900 text-white space-y-10">

        {/* ================= HEADER ================= */}
        <div className="bg-gradient-to-r from-indigo-600/30 to-purple-600/20 p-6 rounded-2xl border border-gray-800 shadow-lg">
          <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
          <p className="text-gray-300 mt-1">
            Track your habits, stay consistent, achieve your goals, and grow daily.
          </p>
        </div>

        {/* ================= QUICK STATS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <div className="p-5 bg-gray-800 rounded-2xl border border-gray-700 shadow hover:shadow-indigo-500/10 transition">
            <div className="flex items-center gap-3">
              <Flame className="text-orange-400" size={26} />
              <h3 className="text-lg font-semibold">Daily Streak</h3>
            </div>
            <p className="text-4xl font-bold mt-3">14🔥</p>
          </div>

          <div className="p-5 bg-gray-800 rounded-2xl border border-gray-700 shadow hover:shadow-green-500/10 transition">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-400" size={26} />
              <h3 className="text-lg font-semibold">Completed</h3>
            </div>
            <p className="text-4xl font-bold mt-3">8 Tasks</p>
          </div>

          <div className="p-5 bg-gray-800 rounded-2xl border border-gray-700 shadow hover:shadow-blue-500/10 transition">
            <div className="flex items-center gap-3">
              <BarChart3 className="text-blue-400" size={26} />
              <h3 className="text-lg font-semibold">Progress</h3>
            </div>
            <p className="text-4xl font-bold mt-3">72%</p>
          </div>

          <div className="p-5 bg-gray-800 rounded-2xl border border-gray-700 shadow hover:shadow-purple-500/10 transition">
            <div className="flex items-center gap-3">
              <Sparkles className="text-purple-400" size={26} />
              <h3 className="text-lg font-semibold">XP Earned</h3>
            </div>
            <p className="text-4xl font-bold mt-3">245 XP</p>
          </div>

        </div>

        {/* ================= FEATURE HIGHLIGHTS ================= */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Explore Your Tools</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700 shadow hover:shadow-indigo-500/10 transition">
              <ListTodo size={28} className="text-indigo-400" />
              <h3 className="font-semibold text-lg mt-4">Smart Todo Manager</h3>
              <p className="text-gray-400 mt-2">
                Add tasks, mark completion, and stay organised every day.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700 shadow hover:shadow-green-500/10 transition">
              <HeartHandshake size={28} className="text-green-400" />
              <h3 className="font-semibold text-lg mt-4">Habit Tracking</h3>
              <p className="text-gray-400 mt-2">
                Build your habits with streaks, XP, and daily logs.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700 shadow hover:shadow-pink-500/10 transition">
              <NotebookText size={28} className="text-pink-400" />
              <h3 className="font-semibold text-lg mt-4">Daily Journaling</h3>
              <p className="text-gray-400 mt-2">
                Reflect your thoughts, save images, and track personal growth.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700 shadow hover:shadow-yellow-500/10 transition">
              <Users size={28} className="text-yellow-400" />
              <h3 className="font-semibold text-lg mt-4">Community Posts</h3>
              <p className="text-gray-400 mt-2">
                Share your wins, interact, inspire others & grow together.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700 shadow hover:shadow-red-500/10 transition">
              <MessageCircle size={28} className="text-red-400" />
              <h3 className="font-semibold text-lg mt-4">HabitBuddy AI</h3>
              <p className="text-gray-400 mt-2">
                Your personal AI habit coach guiding you every day.
              </p>
            </div>

            <div className="p-6 bg-gray-800 rounded-2xl border border-gray-700 shadow hover:shadow-blue-400/10 transition">
              <Calendar size={28} className="text-blue-400" />
              <h3 className="font-semibold text-lg mt-4">Calendar Tracking</h3>
              <p className="text-gray-400 mt-2">
                Visualise progress across the month with clean habit logs.
              </p>
            </div>

          </div>
        </div>

        {/* ================= WEEKLY CHART ================= */}
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow">
          <h2 className="text-xl font-semibold">Weekly Habit Breakdown</h2>
          <p className="text-gray-400 mb-6 text-sm">
            See how your habits performed this week.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {["Week 1", "Week 2", "Week 3"].map((week) => (
              <div
                key={week}
                className="p-5 rounded-lg bg-gray-900 border border-gray-700 shadow"
              >
                <h3 className="font-medium">{week}</h3>
                <p className="text-gray-400 text-sm mb-2">Completion: 60%</p>
                <div className="w-full h-2 bg-gray-700 rounded">
                  <div className="bg-indigo-500 h-2 w-[60%] rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Home;
