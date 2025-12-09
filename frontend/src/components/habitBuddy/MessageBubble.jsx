import React from "react";
import dayjs from "dayjs";

export default function MessageBubble({ role, content, createdAt }) {
  const isUser = role === "user";

  return (
       <div
      className={`w-full flex ${
        isUser ? "justify-end" : "justify-start"
      } py-1`}
    >
      <div
        className={`
          max-w-[90%] sm:max-w-[75%]
          rounded-2xl p-2 sm:p-3 shadow 
          text-sm sm:text-base
          ${isUser 
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-gray-100 text-gray-900 rounded-bl-none"
          }
        `}
      >
        <div className="whitespace-pre-wrap break-words">{content}</div>

        {createdAt && (
          <div
            className={`text-[10px] sm:text-xs mt-1 ${
              isUser ? "text-indigo-200" : "text-gray-500"
            }`}
          >
            {dayjs(createdAt).format("h:mm A")}
          </div>
        )}
      </div>
    </div>
  );
}
