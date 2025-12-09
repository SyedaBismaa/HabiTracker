import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

const  ChatContainer=()=> {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);

  // Load chat & history
  async function loadChat() {
    try {
      const res = await fetch("http://localhost:3000/api/ai", {
        credentials: "include",
      });
      const data = await res.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error("Chat load failed", err);
    }
  }

  useEffect(() => {
    loadChat();
  }, []);

  // Send message
  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const text = input.trim();
    setInput("");

    // optimistic user message
    const tempUser = {
      _id: "temp-" + Date.now(),
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUser]);
    setSending(true);
    setTyping(true);

    try {
      const res = await fetch("http://localhost:3000/api/ai/message", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });

      const data = await res.json();

      const botMsg = {
        _id: "bot-" + Date.now(),
        role: "model",
        content: data.reply,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Send error", err);
    } finally {
      setSending(false);
      setTimeout(() => setTyping(false), 300);
    }
  }

  return (
    <div
      className="
        flex flex-col 
        h-[calc(100vh-4rem)] sm:h-[90vh] 
        bg-gray-900 text-white 
        border border-gray-700 
        rounded-lg 
        w-full
      "
    >
      {/* Header */}
      <div
        className="
        flex items-center gap-2 sm:gap-3
        px-3 sm:px-4 
        py-2 sm:py-3 
        border-b border-gray-700 bg-gray-800
        "
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
          HB
        </div>

        <div className="flex flex-col">
          <div className="font-semibold text-sm sm:text-base">HabitBuddy</div>
          <div className="text-[10px] sm:text-xs text-gray-400">
            Your personal habit coach
          </div>
        </div>
      </div>

      <MessageList messages={messages} typing={typing} />

      <ChatInput
        input={input}
        setInput={setInput}
        onSend={handleSend}
        sending={sending}
      />
    </div>
  );
}

export default ChatContainer;