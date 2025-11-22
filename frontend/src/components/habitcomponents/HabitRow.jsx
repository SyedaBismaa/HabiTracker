// src/components/habit/HabitRow.jsx
import React from "react";
import HabitDayBox from "./HabitDayBox";

const HabitRow = ({ habit, days = [], onToggle = () => {}, onDelete = () => {} }) => {
  return (
    <div className="flex items-center gap-3 mb-3">

      {/* Colored Habit Title Box */}
      <div
        className="flex items-center justify-between w-40 px-2 py-1 rounded-lg"
        style={{ backgroundColor: habit.color || "#0011" }}
      >
        <span className="font-medium text-white ">{habit.title}</span>

        {/* DELETE BUTTON */}
        <button
  onClick={() => {
    console.log("DELETE CLICKED — habitId:", habit._id);
    onDelete(habit._id);
  }}
  className="text-red-400 hover:text-red-600 text-sm font-bold"
>
  ✕
</button>

      </div>

      {/* Habit Day Boxes */}
      <div className="flex gap-1 flex-wrap">
        {days.map((day) => (
          <HabitDayBox
            key={day.date}
            dayNumber={day.dayNumber}
            dateISO={day.date}
            done={day.status}
            onToggle={(iso) => onToggle(habit._id, iso)}
          />
        ))}
      </div>
    </div>
  );
};

export default HabitRow;
