import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import HabitHeader from "../components/habitcomponents/HabitHeader";
import MonthSelector from "../components/habitcomponents/MonthSelector";
import HabitList from "../components/habitcomponents/HabitList";
import HabitCalendarGrid from "../components/habitcomponents/HabitCalenderGrid";
import AddHabitModal from "../components/habitcomponents/AddHabitModel";
import MonthlySummary from "../components/habitcomponents/MonthlySummary";
import MiniAreaChart from "../components/habitcomponents/MiniAreaChart";
import axios from "axios";

axios.defaults.baseURL = "https://habitracker-y4i5.onrender.com";
axios.defaults.withCredentials = true;


function computeHabitCompletion(habitId, logsForHabit, monthDaysCount) {
  const doneCount = (logsForHabit || []).filter((l) => l.status).length;
  const pct = monthDaysCount === 0 ? 0 : (doneCount / monthDaysCount) * 100;
  return { doneCount, pct };
}

function computeOverallPercent(habits, logs, monthDaysCount) {
  if (!habits || habits.length === 0) return 0;
  const perHabPercents = habits.map((h) => {
    const arr = logs[h._id] || [];
    const done = arr.filter((l) => l.status).length;
    return (done / monthDaysCount) * 100;
  });
  return perHabPercents.reduce((s, v) => s + v, 0) / habits.length;
}

function computeDailySeries(habits, logs, month, year) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const series = [];
  for (let d = 1; d <= daysInMonth; d++) {
    const iso = `${year}-${String(month).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    let completed = 0;
    habits.forEach((h) => {
      const arr = logs[h._id] || [];
      const found = arr.find((x) => x.date === iso);
      if (found && found.status) completed++;
    });
    const pct = habits.length === 0 ? 0 : Math.round((completed / habits.length) * 100);
    series.push({ date: iso, pct });
  }
  return series;
}

const HabitPage = () => {
  const [habits, setHabits] = useState([]);
  const [logs, setLogs] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  // ----------------------
  // Fetch habits
  // ----------------------
  const fetchHabits = async () => {
    try {
      const res = await axios.get("/habits");
      setHabits(res.data.habits);
    } catch (err) {
      console.log("Error fetching habits:", err);
    }
  };

  // ----------------------
  // Fetch logs
  // ----------------------
  const fetchLogs = async () => {
    try {
      const res = await axios.get(`/habitlog/logs?month=${month}&year=${year}`);
      const logsArray = res.data.logs || [];

      const formatted = {};
      logsArray.forEach((log) => {
        if (!formatted[log.habit]) formatted[log.habit] = [];
        formatted[log.habit].push({
          date: log.date,
          status: log.status,
          dayNumber: Number(log.date.split("-")[2]),
        });
      });

      setLogs(formatted);
    } catch (err) {
      console.log("Error fetching logs:", err);
    }
  };

  // ----------------------
  // Toggle habit
  // ----------------------
  const toggleHabit = async (habitId, date) => {
    try {
      await axios.post("/habitlog/toggle", { habitId, date });
      fetchLogs();
    } catch (err) {
      console.log("TOGGLE ERROR:", err.response?.data || err);
    }
  };

  // ----------------------
  // Add habit
  // ----------------------
  const addHabit = async ({ title }) => {
    try {
      await axios.post("/habits", { title });
      fetchHabits();
      setOpenModal(false);
    } catch (err) {
      console.log("Error creating habit:", err);
    }
  };

  // ----------------------
  // Delete habit
  // ----------------------
  const deleteHabit = async (id) => {
    try {
      await axios.delete(`/habits/${id}`);
      fetchHabits();
      fetchLogs();
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [month, year]);

  // ----------------------
  // STATS
  // ----------------------
  const daysInMonth = new Date(year, month, 0).getDate();

  const overallPercent = computeOverallPercent(habits, logs, daysInMonth);

  const totalDone = Object.values(logs)
    .flat()
    .filter((l) => l.status).length;

  const dailySeries = computeDailySeries(habits, logs, month, year);

  const habitProgressList = habits.map((h) => {
    const { pct } = computeHabitCompletion(h._id, logs[h._id], daysInMonth);
    return { id: h._id, title: h.title, pct };
  });

  return (
    <DashboardLayout>
      <div className="flex-1 p-6">
        <HabitHeader onOpenAddModal={() => setOpenModal(true)} />

        <MonthSelector
          monthName={new Date(year, month - 1).toLocaleString("default", { month: "long" })}
          year={year}
          onPrev={() => setMonth((prev) => (prev - 1 <= 0 ? 12 : prev - 1))}
          onNext={() => setMonth((prev) => (prev + 1 > 12 ? 1 : prev + 1))}
        />

        {/* -------------------- */}
        {/* SUMMARY CARDS */}
        {/* -------------------- */}
        <MonthlySummary
          overallPercent={overallPercent}
          activeHabits={habits.length}
          totalDone={totalDone}
        />

   

        {/* -------------------- */}
        {/* HABITS + GRID */}
        {/* -------------------- */}
        <HabitCalendarGrid
          habits={habits}
          logs={logs}
          onToggle={toggleHabit}
          onDelete={deleteHabit}
          month={month}
          year={year}
        />
          <MiniAreaChart data={dailySeries} className="mt-10" />

        <AddHabitModal open={openModal} onAdd={addHabit} onClose={() => setOpenModal(false)} />
      </div>
    </DashboardLayout>
  );
};

export default HabitPage;
