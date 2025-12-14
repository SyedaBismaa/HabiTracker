import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import {
  ListTodo,
  HeartHandshake,
  NotebookText,
  Users,
  MessageCircle,
  Calendar,
  ArrowRight,
  Sparkles,
  Flame
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <DashboardLayout>
      <div className="flex-1 px-4 sm:px-6 lg:px-10 py-8 lg:py-10 max-w-6xl mx-auto space-y-12">

        {/* TOP BAR / TAGS */}
        <section className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 items-center rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-200">
              HabitTracker
            </span>
            <span className="text-xs text-gray-400">Daily rituals • Goals • Reflection</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Calendar className="w-4 h-4 text-indigo-300" />
            <span>Today</span>
          </div>
        </section>

        {/* HERO PANEL */}
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          {/* Hero copy */}
          <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-gray-900 via-gray-900/70 to-indigo-950/50 p-7 sm:p-8">
            <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-purple-500/25 blur-3xl" />

            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2 text-xs text-indigo-200">
                <Sparkles className="w-4 h-4" />
                <span>Level up your day</span>
              </div>
              <span className="rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-300">
                V2 · Neo UI
              </span>
            </div>

            <h1 className="text-[1.9rem] sm:text-[2.1rem] md:text-[2.35rem] font-extrabold leading-tight text-white">
              Stay organized,
              <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                grow one habit at a time.
              </span>
            </h1>

            <p className="mt-4 text-sm md:text-[0.92rem] text-gray-400 max-w-xl">
              Plan tasks, track habits, and reflect — all in a calm, glowing dashboard built to keep you in flow.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-transform hover:-translate-y-[1px] hover:shadow-indigo-500/50"
              >
                Get started free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-2xl border border-gray-700/80 bg-black/30 px-5 py-3 text-xs font-medium text-gray-200 hover:border-gray-500 hover:bg-black/60"
              >
                Already have an account?
              </Link>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-4 text-[11px] text-gray-300">
              <div className="rounded-2xl bg-black/35 px-4 py-3 border border-indigo-500/25">
                <p className="text-[10px] uppercase tracking-[0.16em] text-indigo-300 mb-1">
                  Streak
                </p>
                <p className="text-lg font-semibold text-white">18 days</p>
              </div>
              <div className="rounded-2xl bg-black/35 px-4 py-3 border border-purple-500/25">
                <p className="text-[10px] uppercase tracking-[0.16em] text-purple-300 mb-1">
                  Habits today
                </p>
                <p className="text-lg font-semibold text-white">7 / 9</p>
              </div>
              <div className="rounded-2xl bg-black/35 px-4 py-3 border border-pink-500/25">
                <p className="text-[10px] uppercase tracking-[0.16em] text-pink-300 mb-1">
                  Focus mode
                </p>
                <p className="text-lg font-semibold text-white">On</p>
              </div>
            </div>
          </div>

          {/* Side radar / summary */}
          <div className="relative rounded-3xl border border-gray-800 bg-gradient-to-b from-gray-900/70 to-black/80 p-6 flex flex-col justify-between overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.16),_transparent_65%)]" />
            <div className="relative flex items-start justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
                  Today&apos;s focus
                </p>
                <p className="mt-1 text-xs font-medium text-indigo-100">
                  Deep work & movement
                </p>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-400">
                <span className="inline-flex h-6 items-center rounded-full bg-indigo-500/15 px-3 text-[10px] font-semibold text-indigo-200">
                  Level 4
                </span>
              </div>
            </div>

            <div className="relative mt-6 flex items-center justify-center">
              <div className="h-40 w-40 rounded-full border border-indigo-500/40 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-transparent shadow-[0_0_45px_rgba(129,140,248,0.35)]" />
              <div className="absolute h-24 w-24 rounded-full bg-gradient-to-br from-indigo-400/80 to-purple-500/80 opacity-70 blur-lg" />
              <div className="absolute flex h-16 w-16 items-center justify-center rounded-full bg-black/70 border border-indigo-400/70">
                <Flame className="w-7 h-7 text-indigo-200" />
              </div>
            </div>

            <div className="relative mt-6 grid grid-cols-3 gap-3 text-[11px] text-gray-300">
              <div className="rounded-2xl bg-black/40 px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.16em] text-indigo-300">Energy</p>
                <p className="mt-1 font-semibold text-white">76%</p>
              </div>
              <div className="rounded-2xl bg-black/40 px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.16em] text-purple-300">Focus</p>
                <p className="mt-1 font-semibold text-white">High</p>
              </div>
              <div className="rounded-2xl bg-black/40 px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.16em] text-pink-300">Mood</p>
                <p className="mt-1 font-semibold text-white">Calm</p>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="grid gap-8 lg:grid-cols-3">
          {/* Left column */}
          <div className="space-y-8 lg:col-span-2">
            {/* Organize */}
            <div className="rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-950/80 p-6">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300">
                    <ListTodo className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white">Today&apos;s layout</h2>
                    <p className="text-[11px] text-gray-400">
                      Todos • Calendar • Priority blocks
                    </p>
                  </div>
                </div>
                <button className="rounded-full border border-gray-700 px-3 py-1 text-[10px] text-gray-300 hover:border-gray-500">
                  View calendar
                </button>
              </div>

              <div className="mt-4 grid gap-3 text-xs text-gray-300 sm:grid-cols-3">
                <div className="rounded-2xl bg-black/40 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                    Morning block
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Deep work session
                  </p>
                </div>
                <div className="rounded-2xl bg-black/40 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                    Afternoon
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Workout + walk
                  </p>
                </div>
                <div className="rounded-2xl bg-black/40 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-gray-400">
                    Evening
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Reflection & journal
                  </p>
                </div>
              </div>
            </div>

            {/* Habits & streaks */}
            <div className="rounded-3xl border bg-gray-900 border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-950/80 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-green-500/15 text-green-300">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white">Habit streaks</h2>
                    <p className="text-[11px] text-gray-400">Keep your chain unbroken</p>
                  </div>
                </div>
                <span className="rounded-full bg-green-500/15 px-3 py-1 text-[10px] font-medium text-green-200">
                  +120 XP today
                </span>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3 text-xs">
                {[
                  { label: "Morning routine", streak: "12 days", color: "from-green-400 to-emerald-400" },
                  { label: "Workout", streak: "7 days", color: "from-sky-400 to-indigo-400" },
                  { label: "Reading", streak: "21 days", color: "from-purple-400 to-pink-400" }
                ].map((item, idx) => (
                  <div key={idx} className="rounded-2xl bg-black/40 p-3">
                    <p className="text-[11px] text-gray-400 mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-white mb-2">{item.streak}</p>
                    <div className={`h-1.5 rounded-full bg-gradient-to-r ${item.color}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Journal */}
            <div className="rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-950/80 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-pink-500/15 text-pink-300">
                    <NotebookText className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-white">Daily journal</h2>
                    <p className="text-[11px] text-gray-400">Capture what matters</p>
                  </div>
                </div>
                <button className="rounded-full bg-pink-500/15 px-3 py-1 text-[10px] font-medium text-pink-100 hover:bg-pink-500/25">
                  New entry
                </button>
              </div>

              <div className="mt-3 space-y-3 text-xs text-gray-300">
                <div className="rounded-2xl bg-black/40 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-gray-400 mb-1">
                    Yesterday
                  </p>
                  <p>Noticed better focus after a short walk before work.</p>
                </div>
                <div className="rounded-2xl bg-black/40 px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-gray-400 mb-1">
                    Reflection prompt
                  </p>
                  <p>What habit made today 1% better?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* AI */}
            <div className="rounded-3xl border border-gray-800 bg-gradient-to-b from-gray-900/80 to-black/90 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-300">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">HabitBuddy AI</h2>
                  <p className="text-[11px] text-gray-400">Mini coach in your sidebar</p>
                </div>
              </div>
              <div className="space-y-3 text-xs text-gray-300">
                <div className="rounded-2xl bg-black/50 px-4 py-3">
                  <p className="text-[11px] text-indigo-200 mb-1">Suggestion</p>
                  <p>Try stacking “10 min walk” right after your lunch to boost afternoon focus.</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 rounded-2xl bg-indigo-500/20 px-3 py-2 text-[11px] font-medium text-indigo-100 hover:bg-indigo-500/30">
                    Ask for plan
                  </button>
                  <button className="flex-1 rounded-2xl bg-black/40 px-3 py-2 text-[11px] text-gray-200 hover:bg-black/60">
                    Quick motivation
                  </button>
                </div>
              </div>
            </div>

            {/* Community */}
            <div className="rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-950/80 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-300">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Community feed</h2>
                  <p className="text-[11px] text-gray-400">Stay accountable together</p>
                </div>
              </div>
              <div className="space-y-3 text-xs text-gray-300">
                <div className="rounded-2xl bg-black/45 px-4 py-3">
                  <p className="text-[11px] text-amber-200 mb-1">@alex</p>
                  <p>Finished 30-day reading streak. “Tiny steps really do stack up.”</p>
                </div>
                <div className="rounded-2xl bg-black/45 px-4 py-3">
                  <p className="text-[11px] text-amber-200 mb-1">@mira</p>
                  <p>Started “Move for 5 minutes” challenge — join in?</p>
                </div>
                <button className="mt-2 w-full rounded-2xl border border-gray-700/80 bg-black/30 px-3 py-2 text-[11px] text-gray-200 hover:border-gray-500">
                  Open community
                </button>
              </div>
            </div>

            {/* Final CTA */}
            <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-fuchsia-600/20 p-6 text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-indigo-100 mb-2">
                Ready?
              </p>
              <h2 className="text-base font-semibold text-white">
                Start your next streak today.
              </h2>
              <p className="mt-2 text-[11px] text-indigo-100/80">
                No overwhelm. Just a calm, glowing place to build habits that stick.
              </p>
              <Link
                to="/register"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl bg-white/95 px-5 py-3 text-xs font-semibold text-gray-900 shadow-lg hover:bg-white"
              >
                Create free account
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Home;





