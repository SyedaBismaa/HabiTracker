// src/components/habit/HabitCalendarGrid.jsx
import React from "react";
import HabitRow from "./HabitRow";

const HabitCalendarGrid = ({
  habits = [],
  logs = {},
  onToggle = () => {},
  onDelete = () => {},
  month = new Date().getMonth() + 1,
  year = new Date().getFullYear(),
}) => {
  // defensive: ensure month/year are numbers
  const m = Number(month) || new Date().getMonth() + 1;
  const y = Number(year) || new Date().getFullYear();

  // Generate days for the month (1..daysInMonth)
  const daysInMonth = new Date(y, m, 0).getDate();
  const daysArray = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const iso = `${y}-${String(m).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    daysArray.push({ date: iso, dayNumber: day });
  }

 

  return (
    <div className="space-y-4">
      {habits.length === 0 && <p className="text-xl text-white">No habits to display.</p>}

      {habits.map((habit) => {
        // build a quick lookup map for this habit's logs
        const habitLogs = Array.isArray(logs[habit._id]) ? logs[habit._id] : [];
        const habitLogMap = {};
        habitLogs.forEach((l) => {
          if (l && l.date) habitLogMap[l.date] = !!l.status;
        });

        // merge logs into full month days
        const finalDays = daysArray.map((d) => ({
          ...d,
          status: habitLogMap[d.date] || false,
        }));


        return (
          <HabitRow
            key={habit._id}
            habit={habit}
            days={finalDays}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        );
      })}
    </div>
  );
};

export default HabitCalendarGrid;
