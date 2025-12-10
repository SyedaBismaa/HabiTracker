import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import axios from "axios";
import ChatContainer from "../components/habitBuddy/ChatContainer";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState(null);

  const [isAiOpen, setIsAiOpen] = useState(false);

  // Toggle AI Panel
  const openAi = () => setIsAiOpen(true);
  const closeAi = () => setIsAiOpen(false);

  // Fetch logged-in user
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("http://localhost:3000/auth/user", {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    await axios.post("http://localhost:3000/auth/logout", {
      withCredentials: true,
    });
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        user={user}
        logout={handleLogout}
        openAi={openAi}
      />

      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-60" : "ml-16"}`}>

        {/* Navbar */}
        <Navbar user={user} logout={handleLogout} openAi={openAi} />

        {/* MAIN CONTENT */}
        <main className="p-6">{children}</main>

        {/* AI PANEL (sliding from right) */}
   {isAiOpen && (
  <div className="fixed top-15 right-0 h-[90vh] w-[380px] bg-gray-900 border-l border-gray-800 shadow-xl z-50 flex flex-col">

    <button
      onClick={closeAi}
      className="absolute top-3 right-3 bg-gray-800 px-3 py-1 rounded"
    >
      ✕
    </button>

    <div className="h-full overflow-hidden pt-10">
      <ChatContainer />
    </div>
  </div>
)}



      </div>
    </div>
  );
};

export default DashboardLayout;
