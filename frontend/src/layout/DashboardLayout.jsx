import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import HabitBuddyPanel from "../components/habitBuddy/HabitBuddyPanel";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);
  const [isAiOpen, setIsAiOpen] = useState(false);

  // 🌗 THEME STATE
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  // Apply theme to html
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(prev => (prev === "dark" ? "light" : "dark"));

  // Fetch logged-in user
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("https://habitracker-y4i5.onrender.com/auth/user", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await axios.post("https://habitracker-y4i5.onrender.com/auth/logout", {
      withCredentials: true,
    });
    setUser(null);
    window.location.href = "/login";
  };

  

  return (
    <div className="flex min-h-[100dvh] bg-gray-900 text-gray-100  transition-colors">

      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        user={user}
        logout={handleLogout}
        openAi={() => setIsAiOpen(true)}
      />

      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "md:ml-60" : "md:ml-16"} ml-16`}>

        <Navbar
          user={user}
          logout={handleLogout}
          openAi={() => setIsAiOpen(true)}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <main className="p-6">{children}</main>

        <HabitBuddyPanel isOpen={isAiOpen} setIsOpen={setIsAiOpen} />
      </div>
    </div>
  );
};

export default DashboardLayout;
