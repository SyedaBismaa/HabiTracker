import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

const MessageList =({ messages, typing })=> {
  const scrollRef = useRef();

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight + 300;
  }, [messages, typing]);

  return (
     <div
      ref={scrollRef}
      className="
        flex-1 
        overflow-y-auto 
        px-3 sm:px-4 
        py-2 sm:py-4 
        space-y-2 
        scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600
      "
    >
      {messages.length === 0 && !typing && (
        <div className="text-center text-gray-400 mt-6 text-sm sm:text-base">
          No messages yet... Start your habit journey! 🚀
        </div>
      )}

      {messages.map((m) => (
        <MessageBubble key={m._id} {...m} />
      ))}

      {typing && (
        <div className="w-full flex justify-start py-1">
          <TypingIndicator />
        </div>
      )}
    </div>
  );
}


export default MessageList;