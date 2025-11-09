import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      {/* Main Page Content */}
      <main
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        } p-6`}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
