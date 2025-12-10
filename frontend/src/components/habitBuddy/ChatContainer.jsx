import React, { useEffect, useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [typing, setTyping] = useState(false);

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

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const text = input.trim();
    setInput("");

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
      setTyping(false);
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-gray-900">
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} typing={typing} />
      </div>

      <div className="border-t border-gray-700 p-3">
        <ChatInput
          input={input}
          setInput={setInput}
          onSend={handleSend}
          sending={sending}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
