import React from "react";
import { Bell, MessageCircle, LogOut, LogIn, UserPlus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ openAi, user, logout, theme, toggleTheme }) => {
  return (
    <nav className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-[0.7rem] font-bold shadow-md shadow-indigo-500/40">
          HT
        </div>
        <div className="hidden sm:flex flex-col">
          <span className="text-xs font-semibold text-slate-100">
            HabitTracker
          </span>
          <span className="text-[0.65rem] uppercase tracking-[0.18em] text-slate-500">
            Dashboard
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/70 text-slate-200 text-xs shadow-md shadow-black/60 backdrop-blur-md transition hover:border-indigo-400 hover:bg-slate-900"
          title="Toggle theme"
        >
          {theme === "dark" ? "☾" : "☀"}
        </button>

        {/* Chat + notifications (user only) */}
        {user && (
          <>
            <button
              onClick={openAi}
              className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-indigo-500/60 bg-indigo-500/20 text-indigo-100 text-xs shadow-md shadow-indigo-500/40 transition hover:bg-indigo-500/30"
              title="Open HabitBuddy"
            >
              <MessageCircle size={16} />
            </button>

            <button
              className="hidden sm:inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/60 text-slate-200 text-xs shadow-md shadow-black/50 transition hover:border-indigo-400 hover:bg-slate-900"
              title="Notifications"
            >
              <Bell size={16} />
            </button>
          </>
        )}

        {/* Auth buttons */}
        {!user && (
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1.5 text-[0.78rem] font-medium text-white shadow-md shadow-indigo-500/40 transition hover:shadow-indigo-500/60"
            >
              <LogIn size={14} />
              <span className="hidden sm:inline">Login</span>
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center gap-1 rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-[0.78rem] font-medium text-slate-100 shadow-md shadow-black/50 transition hover:border-indigo-400 hover:bg-slate-900"
            >
              <UserPlus size={14} />
              <span className="hidden sm:inline">Register</span>
            </Link>
          </div>
        )}

        {/* Logout + mini user pill */}
        {user && (
          <>
            <div className="hidden sm:flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-1.5 text-[0.75rem] text-slate-200 shadow-md shadow-black/50">
              <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
              <span className="max-w-[120px] truncate">
                {user.username || user.email}
              </span>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center gap-1 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 px-3 py-1.5 text-[0.78rem] font-medium text-white shadow-md shadow-rose-500/50 transition hover:shadow-rose-500/70"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
