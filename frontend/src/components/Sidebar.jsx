import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Trophy,
  User,
  Menu,
  X,
  LogIn,
  LogOut,
  Notebook,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const links = [
    {name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Todo", path: "/todo", icon: <Home size={20} /> },
    { name: "Profile", path: "/profile", icon: <User size={20} /> },
    { name: "Journals", path: "/journals", icon: <Notebook size={20} /> },
    { name: "habits", path: "/habits", icon: <Notebook size={20} /> },
    { name: "Posts", path: "/posts", icon: <BookOpen size={20} /> },
    { name: "Leaderboard", path: "/leaderboard", icon: <Trophy size={20} /> },
    { name: "Register", path: "/register", icon: <LogIn size={20} /> },
    { name: "Login", path: "/login", icon: <LogIn size={20} /> },
    { name: "Logout", path: "/logout", icon: <LogOut size={20} /> },
    
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-md border border-gray-700 hover:bg-gray-800 transition"
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-[#0f172a] text-white transition-all duration-300 z-40 border-r border-gray-800 flex flex-col shadow-lg ${
          isOpen ? "w-60" : "w-16"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-gray-800">
          {isOpen ? (
            <h1 className="text-lg font-semibold tracking-wide">HabitTracker</h1>
          ) : (
            <h1 className="text-indigo-400 font-bold text-xl">H</h1>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`group flex items-center rounded-lg transition-all duration-200 px-4 py-3 mx-2 relative ${
                location.pathname === link.path
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <div className="flex-shrink-0">{link.icon}</div>
              {isOpen && (
                <span className="ml-3 text-sm font-medium">{link.name}</span>
              )}

              {/* Tooltip when collapsed */}
              {!isOpen && (
                <span className="absolute left-16 bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none border border-gray-700">
                  {link.name}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-800 text-center text-gray-500 py-3 text-xs">
          {isOpen && "© 2025 HabitTracker"}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;