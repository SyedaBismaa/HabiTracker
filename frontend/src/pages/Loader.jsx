import React, { useState, useEffect } from "react";

const Loader = ({ message = "Loading", fullScreen = true }) => {
  const [dots, setDots] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev === 3 ? 1 : prev + 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const containerClass = fullScreen
    ? "flex items-center justify-center min-h-screen"
    : "flex items-center justify-center";

  return (
    <div className={`${containerClass} gap-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900`}>
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Animated Spinner */}
        <div className="relative w-16 h-16">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-indigo-400 animate-spin" />
          {/* Middle rotating ring - reversed */}
          <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-purple-500 border-l-purple-400 animate-spin" style={{ animationDirection: "reverse" }} />
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Loading Text with animated dots */}
        <div className="text-center">
          <p className="text-lg font-semibold text-white tracking-wide">
            {message}
            {".".repeat(dots)}
          </p>
          <p className="text-xs text-gray-400 mt-2 animate-pulse">
            Please wait
          </p>
        </div>

        {/* Bouncing dots fallback */}
        <div className="flex gap-2 mt-2">
          <span className="h-3 w-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="h-3 w-3 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="h-3 w-3 bg-indigo-400 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
