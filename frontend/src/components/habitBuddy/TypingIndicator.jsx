import React from "react";

const TypingIndicator =()=> {
  return (
  <div
      className="
        flex items-center gap-1.5 sm:gap-2
        px-2 sm:px-3 
        py-1.5 sm:py-2 
        bg-gray-100 
        rounded-2xl rounded-bl-none 
        w-fit
      "
    >
      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-600 rounded-full animate-pulse"></span>
      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-600 rounded-full animate-pulse delay-150"></span>
      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-600 rounded-full animate-pulse delay-300"></span>
    </div>
  );
}

export default TypingIndicator 