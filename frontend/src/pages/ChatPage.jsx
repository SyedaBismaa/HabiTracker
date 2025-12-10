import React from "react";
import DashboardLayout from "../layout/DashboardLayout";
import ChatContainer from "../components/habitBuddy/ChatContainer";

const ChatPage = () => {
  return (
    <DashboardLayout>

      <div className="flex w-full">

        {/* Main Chat Area */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-2">HabitBuddy AI</h1>
          <p className="text-gray-400 mb-6">
            Chat with your personal habit coach 🤖
          </p>

          <div className="h-[80vh]">
            <ChatContainer />
          </div>
        </div>
      </div>

    </DashboardLayout>
  );
};

export default ChatPage;
