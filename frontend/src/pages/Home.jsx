import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  ListTodo,
  HeartHandshake,
  NotebookText,
  Users,
  MessageCircle,
  Calendar,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <DashboardLayout>
      <div className="flex-1 p-6 space-y-24">

        {/* ================= HERO ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              Stay Organized. <br />
              <span className="text-indigo-400">Achieve Your Goals.</span>
            </h1>

            <p className="text-gray-400 mt-5 max-w-xl">
              HabitTracker helps you plan tasks, build habits,
              stay consistent, and grow — one day at a time.
            </p>

            <div className="flex gap-4 mt-8">
              <Link
                to="/login"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold flex items-center gap-2"
              >
                Get Started <ArrowRight size={18} />
              </Link>

              <Link
                to="/register"
                className="px-6 py-3 border border-gray-700 rounded-xl hover:bg-gray-800"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* IMAGE / VIDEO PLACEHOLDER */}
          <div className="h-[280px] rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center text-gray-500">
            🔥 App Demo / Hero Image
          </div>
        </section>

        {/* ================= ORGANIZE ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1 h-[260px] rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-500">
            📋 Todo / Calendar Screenshot
          </div>

          <div className="order-1 lg:order-2">
            <ListTodo className="text-indigo-400 mb-4" size={30} />
            <h2 className="text-3xl font-bold">Organize Your Day</h2>
            <p className="text-gray-400 mt-3 max-w-xl">
              Manage todos, schedule habits, and visualise
              your progress with clean calendar views.
            </p>
          </div>
        </section>

        {/* ================= HABITS ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <HeartHandshake className="text-green-400 mb-4" size={30} />
            <h2 className="text-3xl font-bold">Build Powerful Habits</h2>
            <p className="text-gray-400 mt-3 max-w-xl">
              Track daily habits, maintain streaks,
              and earn XP for consistency.
            </p>
          </div>

          <div className="h-[260px] rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-500">
            🔥 Habit Streaks / XP Graph
          </div>
        </section>

        {/* ================= JOURNAL ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1 h-[260px] rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-500">
            📝 Journal + Image Upload Demo
          </div>

          <div className="order-1 lg:order-2">
            <NotebookText className="text-pink-400 mb-4" size={30} />
            <h2 className="text-3xl font-bold">Reflect & Grow</h2>
            <p className="text-gray-400 mt-3 max-w-xl">
              Journal your thoughts, attach images,
              and track personal growth over time.
            </p>
          </div>
        </section>

        {/* ================= COMMUNITY ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <Users className="text-yellow-400 mb-4" size={30} />
            <h2 className="text-3xl font-bold">Grow With Community</h2>
            <p className="text-gray-400 mt-3 max-w-xl">
              Share progress, like posts,
              comment, and stay motivated together.
            </p>
          </div>

          <div className="h-[260px] rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-500">
            🌍 Community Feed Preview
          </div>
        </section>

        {/* ================= AI ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1 h-[260px] rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-gray-500">
            🤖 AI Chat Demo
          </div>

          <div className="order-1 lg:order-2">
            <MessageCircle className="text-purple-400 mb-4" size={30} />
            <h2 className="text-3xl font-bold">HabitBuddy AI</h2>
            <p className="text-gray-400 mt-3 max-w-xl">
              Get personalised habit advice,
              daily motivation, and goal insights.
            </p>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="text-center py-20 border-t border-gray-800">
          <h2 className="text-3xl font-bold">
            Ready to Take Control of Your Life?
          </h2>

          <p className="text-gray-400 mt-4">
            Start today. Stay consistent. Achieve more.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold"
            >
              Get Started Free
            </Link>
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
};

export default Home;
