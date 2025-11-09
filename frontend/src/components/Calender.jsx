import React, { useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay(); // 0 = Sunday

  const handlePrev = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNext = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const weeks = [];
  let day = 1 - startDay;
  while (day <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      if (day > 0 && day <= daysInMonth) {
        week.push(day);
      } else {
        week.push(null);
      }
      day++;
    }
    weeks.push(week);
  }

  return (
    <div className="bg-gray-800 rounded-2xl shadow-md p-6 w-80">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrev} className="text-gray-600 hover:text-black">
          ⬅️
        </button>
        <h2 className="text-lg font-semibold">
          {monthName} {year}
        </h2>
        <button onClick={handleNext} className="text-gray-100 hover:text-black">
          ➡️
        </button>
      </div>

      <div className="grid grid-cols-7 text-center font-medium text-gray-100 mb-2">
        <div>Sun</div><div>Mon</div><div>Tue</div>
        <div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {weeks.map((week, i) => (
          <React.Fragment key={i}>
            {week.map((day, j) => (
              <div
                key={j}
                className={`h-10 flex items-center justify-center rounded-md ${
                  day
                    ? "text-gray-100 hover:bg-gray-700"
                    : "text-transparent"
                }`}
              >
                {day}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
