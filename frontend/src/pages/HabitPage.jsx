import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import HabitHeader from "../components/habitcomponents/HabitHeader";
import MonthSelector from "../components/habitcomponents/MonthSelector";
import HabitList from "../components/habitcomponents/HabitList";
import HabitCalendarGrid from "../components/habitcomponents/HabitCalenderGrid";
import AddHabitModal from "../components/habitcomponents/AddHabitModel";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

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
     console.log("FETCHING HABITS...");
const res = await axios.get("/habits");
console.log("HABITS RESPONSE:", res.data);

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
         console.log("FETCHING LOGS — month, year:", month, year);
      const res = await axios.get(`/habitlog/logs?month=${month}&year=${year}`);

      const logsArray = res.data.logs || [];

    
console.log("RAW LOGS API RESPONSE:", res.data);

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
  // Toggle habit status
  // ----------------------
const toggleHabit = async (habitId, date) => {
  console.log("TOGGLE API CALL —", { habitId, date });

  try {
    const res = await axios.post("/habitlog/toggle", { habitId, date });
    console.log("TOGGLE SUCCESS:", res.data);

    fetchLogs();
  } catch (err) {
    console.log("TOGGLE ERROR:", err.response?.data || err);
  }
};


  // ----------------------
  // Add habit
  // ----------------------
  const addHabit = async ({ title, color }) => {
    try {
      await axios.post("/habits", { title, color });
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
  console.log("DELETE API CALL — habitId:", id);

  try {
    const res = await axios.delete(`/habits/${id}`);
    console.log("DELETE SUCCESS:", res.data);

    fetchHabits();
    fetchLogs();
  } catch (err) {
    console.log("DELETE ERROR:", err.response?.data || err);
  }
};

  useEffect(() => {
    fetchHabits();
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [month, year]);

  return (
    <div className="flex min-h-screen bg-gray-900">
      <DashboardLayout />

      <div className="flex-1 p-6">
        <HabitHeader onOpenAddModal={() => setOpenModal(true)} />

        <MonthSelector
          monthName={new Date(year, month - 1).toLocaleString("default", {
            month: "long",
          })}
          year={year}
          onPrev={() => setMonth((prev) => (prev - 1 <= 0 ? 12 : prev - 1))}
          onNext={() => setMonth((prev) => (prev + 1 > 12 ? 1 : prev + 1))}
        />

        <HabitList  />

        <HabitCalendarGrid
          habits={habits}
          logs={logs}
          onToggle={toggleHabit}
          onDelete={deleteHabit}
          month={month}
          year={year}
        />

        <AddHabitModal
          open={openModal}
          onAdd={addHabit}
          onClose={() => setOpenModal(false)}
        />
      </div>
    </div>
  );
};

export default HabitPage;
