import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  CheckSquare,
  NotebookText,
  HeartHandshake,
  Edit3,
  Trophy,
  User,
  Menu,
  X,
  LogIn,
  LogOut,
  MessageCircle,
  UserPlus,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen, user, logout, openAi }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  const privateLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Todo", path: "/todo", icon: <CheckSquare size={18} /> },
    { name: "Journals", path: "/journals", icon: <NotebookText size={18} /> },
    { name: "Habits", path: "/habits", icon: <HeartHandshake size={18} /> },
    { name: "Posts", path: "/posts", icon: <Edit3 size={18} /> },
    { name: "Leaderboard", path: "/leaderboard", icon: <Trophy size={18} /> },
    { name: "Profile", path: "/profile", icon: <User size={18} /> },
  ];

  const guestLinks = [
    { name: "Login", path: "/login", icon: <LogIn size={18} /> },
    { name: "Register", path: "/register", icon: <UserPlus size={18} /> },
  ];

  return (
    <>
      {/* Mobile toggle button - only visible on mobile */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 flex md:hidden h-9 w-9 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/90 text-slate-100 shadow-lg shadow-black/60 backdrop-blur-md transition-all hover:border-indigo-400 hover:bg-slate-900"
      >
        {mobileOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Desktop toggle button - only visible on desktop */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex fixed top-4 left-4 z-50 h-9 w-9 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/90 text-slate-100 shadow-lg shadow-black/60 backdrop-blur-md transition-all hover:border-indigo-400 hover:bg-slate-900"
      >
        {isOpen ? <X size={16} /> : <Menu size={16} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 flex h-screen flex-col border-r border-slate-800/80 bg-slate-950/95 text-slate-100 shadow-[0_18px_45px_rgba(15,23,42,0.95)] backdrop-blur-2xl transition-all duration-300 ${
          isMobile
            ? mobileOpen
              ? "w-60"
              : "w-16"
            : isOpen
            ? "w-60"
            : "w-16"
        }`}
      >
        {/* Logo / Brand */}
        <div className="relative flex h-16 items-center border-b border-slate-800/80 px-3">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.2),_transparent_60%)]" />
          <div className="relative flex items-center gap-2">
            {(isMobile ? mobileOpen : isOpen) ? (
              <>
                <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-[0.7rem] font-bold shadow-lg shadow-indigo-500/40">
                  HT
                </div>
                <div className="flex flex-col">
                  <span className="text-[0.8rem] font-semibold tracking-wide">
                    HabitTracker
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-[0.18em] text-slate-400">
                    v2 dashboard
                  </span>
                </div>
              </>
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-xs font-bold shadow-lg shadow-indigo-500/40">
                HT
              </div>
            )}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-2 overflow-y-auto py-4">
          {/* Private links */}
          {user &&
            privateLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`group relative mx-2 flex items-center rounded-2xl px-3 py-2.5 text-[0.8rem] transition-all ${
                    active
                      ? "bg-gradient-to-r from-indigo-500/80 via-purple-500/80 to-fuchsia-500/80 text-white shadow-md shadow-indigo-500/40"
                      : "text-slate-300 hover:bg-slate-900/80 hover:text-slate-50"
                  }`}
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-xl ${
                      active
                        ? "bg-black/20"
                        : "bg-slate-900/80 group-hover:bg-slate-900"
                    }`}
                  >
                    {link.icon}
                  </div>
                  {(isMobile ? mobileOpen : isOpen) && (
                    <span className="ml-3 truncate font-medium">
                      {link.name}
                    </span>
                  )}

                  {!(isMobile ? mobileOpen : isOpen) && (
                    <span className="pointer-events-none absolute left-14 rounded-md border border-slate-800 bg-slate-950 px-2 py-1 text-[0.7rem] font-medium text-slate-100 opacity-0 shadow-lg shadow-black/70 transition group-hover:opacity-100">
                      {link.name}
                    </span>
                  )}

                  {active && (
                    <span className="absolute inset-y-2 right-1 w-1 rounded-full bg-white/70" />
                  )}
                </Link>
              );
            })}

          {/* Chat button */}
          {user && (
            <button
              onClick={openAi}
              className="group relative mx-2 mt-1 flex w-[calc(100%-1rem)] items-center rounded-2xl px-3 py-2.5 text-left text-[0.8rem] text-slate-300 transition-all hover:bg-slate-900/80 hover:text-slate-50"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-900/80 group-hover:bg-slate-900">
                <MessageCircle size={18} />
              </div>
              {(isMobile ? mobileOpen : isOpen) && (
                <span className="ml-3 truncate font-medium">HabitBuddy</span>
              )}
              {!(isMobile ? mobileOpen : isOpen) && (
                <span className="pointer-events-none absolute left-14 rounded-md border border-slate-800 bg-slate-950 px-2 py-1 text-[0.7rem] font-medium text-slate-100 opacity-0 shadow-lg shadow-black/70 transition group-hover:opacity-100">
                  HabitBuddy
                </span>
              )}
            </button>
          )}

          {/* Guest links */}
          {!user &&
            guestLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="group relative mx-2 flex items-center rounded-2xl px-3 py-2.5 text-[0.8rem] text-slate-300 transition-all hover:bg-slate-900/80 hover:text-slate-50"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-900/80 group-hover:bg-slate-900">
                  {link.icon}
                </div>
                {(isMobile ? mobileOpen : isOpen) && (
                  <span className="ml-3 truncate font-medium">
                    {link.name}
                  </span>
                )}
              </Link>
            ))}

          {/* Logout */}
          {user && (
            <button
              onClick={logout}
              className="group relative mx-2 mt-2 flex w-[calc(100%-1rem)] items-center rounded-2xl px-3 py-2.5 text-left text-[0.8rem] text-rose-300 transition-all hover:bg-rose-900/30 hover:text-rose-100"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-rose-900/40 group-hover:bg-rose-900/60">
                <LogOut size={18} />
              </div>
              {(isMobile ? mobileOpen : isOpen) && (
                <span className="ml-3 truncate font-medium">Logout</span>
              )}
            </button>
          )}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-800/80 px-3 py-3 text-center text-[0.7rem] text-slate-500">
          {(isMobile ? mobileOpen : isOpen) ? "© 2025 HabitTracker" : "© 25"}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
