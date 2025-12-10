import React from "react";
import { Bell, MessageCircle, LogOut, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ openAi, user, logout }) => {
  return (
    <nav className="w-full px-4 py-3 flex items-center justify-between border-b border-gray-800 bg-gray-900">

      {/* Left side (logo optional) */}
      <div></div>

      {/* Right side — visible only on desktop */}
      <div className="hidden sm:flex items-center gap-3">

        {/* Chat Button */}
        {user && (
          <button
            onClick={openAi}
            className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition text-white"
            title="Open HabitBuddy"
          >
            <MessageCircle size={18} />
          </button>
        )}

        {/* Notifications */}
        {user && (
          <button
            className="p-2 rounded-md bg-transparent hover:bg-gray-800 transition text-white"
            title="Notifications"
          >
            <Bell size={18} />
          </button>
        )}

        {/* LOGIN / REGISTER (show when NOT logged in) */}
        {!user && (
          <>
            <Link
              to="/login"
              className="flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 rounded-md text-sm"
            >
              <LogIn size={16} /> Login
            </Link>

            <Link
              to="/register"
              className="flex items-center gap-1 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm"
            >
              <UserPlus size={16} /> Register
            </Link>
          </>
        )}

        {/* LOGOUT (visible only when logged in) */}
        {user && (
          <button
            onClick={logout}
            className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-500 rounded-md text-sm"
          >
            <LogOut size={16} /> Logout
          </button>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
