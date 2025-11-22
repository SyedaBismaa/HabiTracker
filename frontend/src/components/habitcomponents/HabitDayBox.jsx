// src/components/habit/HabitDayBox.jsx
import React from "react";

const HabitDayBox = ({ dayNumber, dateISO, done = false, onToggle = () => {} }) => {
  return (
    <div
      onClick={() => onToggle(dateISO)}
      className={`w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer border transition 
        ${done ? "bg-green-500 border-green-600 " : "bg-gray-700 border-gray-600 "}
        hover:opacity-90`}
      title={dateISO}
    >
      {dayNumber}
    </div>
  );
};

export default HabitDayBox;
