import React from "react";

const HabitHeader = ({ onOpenAddModal }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold tracking-wide text-white">Habit Tracker</h2>

      <button
        onClick={onOpenAddModal}
        className="px-4 py-2 bg-green-500  font-semibold rounded-lg shadow hover:bg-green-400 transition"
      >
        + Add Habit
      </button>
    </div>
  );
};

export default HabitHeader;
