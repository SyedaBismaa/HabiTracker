import React from "react";

const  ChatInput =({ input, setInput, onSend, sending })=> {
  return (
  <form
      onSubmit={onSend}
      className="
        flex items-center gap-2 sm:gap-3 
        px-3 sm:px-4 
        py-2 sm:py-3 
        border-t border-gray-700 
        bg-gray-900
      "
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Message HabitBuddy…"
        className="
          flex-1 
          outline-none 
          p-2 sm:p-3 
          rounded-lg 
          bg-gray-800 
          border border-gray-700 
          text-white 
          text-sm sm:text-base
        "
      />

      <button
        type="submit"
        disabled={sending || !input.trim()}
        className={`
          px-3 sm:px-4 
          py-2 
          rounded-lg 
          text-white 
          text-sm sm:text-base
          ${sending || !input.trim()
            ? "bg-indigo-300 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
          }
        `}
      >
        {sending ? "Sending…" : "Send"}
      </button>
    </form>
  );
}

export default ChatInput;