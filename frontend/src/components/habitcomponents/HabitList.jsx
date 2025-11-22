// src/components/habit/HabitList.jsx
import React from "react";

const HabitList = ({ habits = [] }) => {
  return (
    <div className="space-y-2 mb-6">
      {habits.map((habit) => (
        <div
          key={habit._id}
          className="p-3 bg-gray-800 rounded-lg shadow  font-medium"
        >
          {habit.title}

        </div>
        
      ))}
    </div>
  );
};

export default HabitList;
