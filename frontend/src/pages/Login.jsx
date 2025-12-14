import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Sparkles, LockKeyhole, Mail } from "lucide-react";

const Login = ({ setUser })  => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

   const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post(
        "https://habitracker-y4i5.onrender.com/auth/login",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      // ✅ Login SUCCESS (cookie set)
      navigate("/");   // App.jsx will fetch /auth/me automatically
      return;

    } catch (err) {
      console.log("LOGIN ERROR:", err);
      setError("Invalid email or password");
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-950 to-indigo-950 flex items-center justify-center ">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 -left-10 h-60 w-60 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute  h-72 w-72 rounded-full bg-purple-500/30 blur-3xl" />
      </div>

      <div className="relative grid w-full max-w-5xl gap-8 lg:grid-cols-[1.2fr_minmax(0,1fr)] items-center">
        {/* Left intro panel */}
        <div className="hidden lg:flex flex-col gap-6 rounded-3xl border border-indigo-500/25 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-indigo-950/60 p-8 shadow-[0_0_50px_rgba(79,70,229,0.35)]">
          <div className="inline-flex items-center gap-2 text-xs text-indigo-200/90">
            <Sparkles className="w-4 h-4" />
            <span className="tracking-[0.16em] uppercase">HabitTracker</span>
          </div>
          <h1 className="text-[1.7rem] font-extrabold leading-tight text-white">
            Welcome back to your
            <span className="block bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              daily leveling system.
            </span>
          </h1>
          <p className="text-[0.88rem] text-slate-300/90 max-w-sm">
            Pick up where you left off, continue your streaks, and keep your
            routines glowing — one check-in at a time.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3 text-[11px] text-slate-200/90">
            <div className="rounded-2xl bg-black/40 border border-indigo-500/30 px-3 py-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-indigo-200 mb-1">
                Longest streak
              </p>
              <p className="text-lg font-semibold text-white">42d</p>
            </div>
            <div className="rounded-2xl bg-black/40 border border-purple-500/30 px-3 py-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-purple-200 mb-1">
                Habits done
              </p>
              <p className="text-lg font-semibold text-white">318</p>
            </div>
            <div className="rounded-2xl bg-black/40 border border-pink-500/30 px-3 py-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-pink-200 mb-1">
                Today&apos;s focus
              </p>
              <p className="text-lg font-semibold text-white">Calm</p>
            </div>
          </div>
        </div>

        {/* Right form card */}
        <div className="relative">
          <div className="absolute srounded-[26px] bg-gradient-to-br from-indigo-500/60 via-purple-500/40 to-fuchsia-500/60 opacity-60 blur-md" />
          <div className="relative rounded-[26px] bg-slate-950/90 border border-slate-800/80 backdrop-blur-2xl px-6 py-7 sm:px-8 sm:py-8 shadow-[0_18px_45px_rgba(15,23,42,0.90)]">
            <div className="mb-6 text-center">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Login
              </p>
              <h2 className="mt-1 text-xl font-semibold text-white">
                Welcome back 👋
              </h2>
              <p className="mt-1 text-[0.8rem] text-slate-400">
                Log in to keep your habits in motion.
              </p>
            </div>

            {error && (
              <p className="mb-4 rounded-2xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-[0.78rem] text-red-200 text-center">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-[0.78rem] font-medium text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-indigo-300" />
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-[0.85rem] text-slate-50 placeholder:text-slate-500 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="flex items-center justify-between text-[0.78rem] font-medium text-slate-300">
                  <span className="flex items-center gap-2">
                    <LockKeyhole className="w-3.5 h-3.5 text-indigo-300" />
                    Password
                  </span>
                  <button
                    type="button"
                    className="text-[0.7rem] text-indigo-300 hover:text-indigo-200"
                  >
                    Forgot?
                  </button>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-[0.85rem] text-slate-50 placeholder:text-slate-500 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="mt-1 w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-3 text-[0.85rem] font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:shadow-indigo-500/50 hover:-translate-y-[1px]"
              >
                Login
              </button>

              <a
                href="https://habitracker-y4i5.onrender.com/auth/google"
                className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/40 px-4 py-3 text-[0.8rem] font-medium text-slate-100 transition-all hover:border-slate-500 hover:bg-slate-900/70"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google Icon"
                  className="w-4 h-4"
                />
                <span>Continue with Google</span>
              </a>
            </form>

            <p className="mt-5 text-center text-[0.78rem] text-slate-400">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-indigo-300 hover:text-indigo-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
