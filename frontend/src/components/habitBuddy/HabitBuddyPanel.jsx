import React, { useEffect } from "react";
import ChatContainer from "./ChatContainer";
import { X } from "lucide-react";

const HabitBuddyPanel = ({ isOpen, setIsOpen }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  // Send event to ChatContainer to reset messages
  const handleNewChat = () => {
    window.dispatchEvent(new Event("new-chat"));
  };

  return (
    <div
      className={`fixed top-0 right-0 z-50 
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
        w-full sm:w-[420px] h-screen
        backdrop-blur-sm bg-black/20`}
    >
      <div
        className="bg-white dark:bg-gray-900 text-black dark:text-white 
        w-full h-full shadow-2xl flex flex-col 
        border-l border-gray-300 dark:border-gray-700"
      >

        {/* HEADER */}
        <div className="flex items-center justify-between px-4 py-3 
          border-b border-gray-200 dark:border-gray-800 
          bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
              HB
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">HabitBuddy</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Your AI habit coach</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNewChat}
              className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              New Chat
            </button>

            <button
              className="p-2 rounded-md text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <X />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto">
          <ChatContainer />
        </div>
      </div>
    </div>
  );
};

export default HabitBuddyPanel;
