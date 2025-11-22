import React from "react";

const MonthSelector = ({ monthName = "January", year = 2025, onPrev = () => {}, onNext = () => {} }) => {
  return (
    <div className="flex justify-center items-center gap-4 mb-6">
      <button
        onClick={onPrev}
        className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600"
      >
        ‹
      </button>

      <h2 className="text-xl font-semibold text-white">
        {monthName} {year}
      </h2>

      <button
        onClick={onNext}
        className="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600"
      >
        ›
      </button>
    </div>
  );
};

export default MonthSelector;
