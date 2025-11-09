import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Trophy, User, Menu, X } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Profile", path: "/Profile", icon: <User size={20} /> },
    { name: "Journals", path: "/journals", icon: <BookOpen size={20} /> },
    { name: "Leaderboard", path: "/leaderboard", icon: <Trophy size={20} /> },
    { name: "Register", path: "/register", icon: <Trophy size={20} /> },
    { name: "Login", path: "/login", icon: <Trophy size={20} /> },
    
           
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-md"
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-screen bg-[#0f172a] text-white transition-all duration-300 z-40 border-r border-gray-700 ${
          isOpen ? "w-64" : "w-20"
        } flex flex-col`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <h1
            className={`text-xl font-semibold transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            HabitTracker
          </h1>
        </div>

        <nav className="flex-1 mt-6 space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-3 px-5 py-3 rounded-lg transition-all duration-200 ${
                location.pathname === link.path
                  ? "bg-indigo-600"
                  : "hover:bg-gray-700"
              }`}
            >
              {link.icon}
              {isOpen && <span>{link.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
