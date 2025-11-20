import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Page Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-60" : "ml-16"
        } p-6`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;