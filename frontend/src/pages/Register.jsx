import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, LockKeyhole, Sparkles } from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://habitracker-y4i5.onrender.com/auth/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      if (res.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-gray-950 via-slate-950 to-indigo-950 flex items-center justify-center">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 right-0 h-64 w-64 rounded-full bg-purple-500/35 blur-3xl" />
        <div className="absolute  h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
      </div>

      <div className="relative grid w-full max-w-5xl gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
        {/* Left form */}
        <div className="relative">
          <div className="absolute -inset-[1px] rounded-[26px] bg-gradient-to-br from-indigo-500/60 via-purple-500/40 to-fuchsia-500/60 opacity-60 blur-md" />
          <div className="relative rounded-[26px] bg-slate-950/90 border border-slate-800/80 backdrop-blur-2xl px-6 py-7 sm:px-8 sm:py-8 shadow-[0_18px_45px_rgba(15,23,42,0.90)]">
            <div className="mb-6 text-center">
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Sign up
              </p>
              <h1 className="mt-1 text-xl font-semibold text-white">
                Create your HabitTracker
              </h1>
              <p className="mt-1 text-[0.8rem] text-slate-400">
                One account for habits, tasks, journaling, and more.
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-2xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-[0.78rem] text-red-200 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-[0.78rem] font-medium text-slate-300">
                  <User className="w-3.5 h-3.5 text-indigo-300" />
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-[0.85rem] text-slate-50 placeholder:text-slate-500 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="Choose a unique name"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-[0.78rem] font-medium text-slate-300">
                  <Mail className="w-3.5 h-3.5 text-indigo-300" />
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-[0.85rem] text-slate-50 placeholder:text-slate-500 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="you@example.com"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-[0.78rem] font-medium text-slate-300">
                  <LockKeyhole className="w-3.5 h-3.5 text-indigo-300" />
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-[0.85rem] text-slate-50 placeholder:text-slate-500 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/40"
                  placeholder="Create a strong password"
                  required
                />
                <p className="mt-1 text-[0.72rem] text-slate-500">
                  At least 8 characters, mix of letters and numbers.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`mt-1 w-full rounded-2xl px-4 py-3 text-[0.85rem] font-semibold text-white shadow-lg transition-all ${
                  loading
                    ? "bg-indigo-500/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:-translate-y-[1px] hover:shadow-indigo-500/50"
                }`}
              >
                {loading ? "Creating account..." : "Create account"}
              </button>

              <div className="flex items-center gap-3 text-[0.7rem] text-slate-500">
                <span className="h-px flex-1 bg-slate-700" />
                <span>or</span>
                <span className="h-px flex-1 bg-slate-700" />
              </div>

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

            <div className="mt-5 text-center text-[0.78rem] text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-300 hover:text-indigo-200"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Right info card */}
        <div className="hidden lg:flex flex-col justify-between rounded-3xl border border-indigo-500/25 bg-gradient-to-br from-slate-950/80 via-slate-900/70 to-indigo-950/60 p-8 shadow-[0_0_50px_rgba(79,70,229,0.35)]">
          <div className="flex items-center gap-2 text-xs text-indigo-200/90">
            <Sparkles className="w-4 h-4" />
            <span className="tracking-[0.16em] uppercase">Level up</span>
          </div>

          <div className="space-y-4 mt-4">
            <h2 className="text-[1.5rem] font-extrabold leading-tight text-white">
              Build a space that keeps you coming back.
            </h2>
            <p className="text-[0.86rem] text-slate-300/90">
              Your dashboard ties together habits, tasks, journal entries, and
              AI insights with a calm, neon-inspired interface.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-[11px] text-slate-200/90">
            <div className="rounded-2xl bg-black/35 border border-indigo-500/30 px-3 py-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-indigo-200 mb-1">
                Guided streaks
              </p>
              <p className="text-sm font-semibold text-white">
                Smart reminders & XP.
              </p>
            </div>
            <div className="rounded-2xl bg-black/35 border border-purple-500/30 px-3 py-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-purple-200 mb-1">
                Reflection first
              </p>
              <p className="text-sm font-semibold text-white">
                Journal + mood tracking.
              </p>
            </div>
            <div className="rounded-2xl bg-black/35 border border-pink-500/30 px-3 py-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-pink-200 mb-1">
                Community
              </p>
              <p className="text-sm font-semibold text-white">
                Challenges & support.
              </p>
            </div>
            <div className="rounded-2xl bg-black/35 border border-emerald-500/30 px-3 py-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-emerald-200 mb-1">
                Private by default
              </p>
              <p className="text-sm font-semibold text-white">
                You control what you share.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;