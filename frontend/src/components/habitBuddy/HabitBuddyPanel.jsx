import React, { useEffect } from "react";
import ChatContainer from "./ChatContainer";
import { X } from "lucide-react";

const HabitBuddyPanel = ({ isOpen, setIsOpen }) => {
  // prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 right-0 h-full z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      style={{ width: "100%" }}
    >
      <div className="flex justify-end">
        <div
          className={`bg-white dark:bg-gray-900 text-black dark:text-white h-full shadow-2xl
            w-full sm:w-[420px] md:w-[420px] lg:w-[420px] flex flex-col`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
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
                className="p-2 rounded-md text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI panel"
              >
                <X />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <ChatContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HabitBuddyPanel;
