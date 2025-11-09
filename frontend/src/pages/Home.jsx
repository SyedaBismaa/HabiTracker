import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layout/DashboardLayout";

const Home = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchUserAndTodos = async () => {
      try {
        const [userRes, todosRes] = await Promise.all([
          axios.get("http://localhost:3000/auth/user", { withCredentials: true }),
          axios.get("http://localhost:3000/todos", { withCredentials: true }),
        ]);

        setUser(userRes.data.user);
        setTodos(todosRes.data);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndTodos();
  }, []);

  // ✅ Add new todo
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:3000/todos",
        { task: newTask },
        { withCredentials: true }
      );
      setTodos((prev) => [...prev, res.data]);
      setNewTask("");
    } catch (error) {
      console.error("❌ Error adding todo:", error);
    }
  };

  // ✅ Toggle todo completion
  const toggleTodo = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/todos/${id}`,
        {},
        { withCredentials: true }
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: res.data.completed } : todo
        )
      );
    } catch (error) {
      console.error("❌ Error toggling todo:", error);
    }
  };

  // 🗑️ Delete todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`, {
        withCredentials: true,
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("❌ Error deleting todo:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-900 items-center justify-center">
        <p className="text-lg text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-900 text-white">
      <DashboardLayout />

      {/* 🧩 Main Content */}
      <div className="flex-1 p-4 sm:p-8 ml-16 sm:ml-20">
        {/* User Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            👋 Hi, <span className="text-indigo-400">{user?.username || "User"}</span>
          </h1>
          <p className="text-gray-400 mt-1">Here are your tasks for today:</p>
        </div>

        {/* 📱 Responsive Grid — Todos + Calendar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ✅ Todos Section */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
            {/* Add Todo */}
            <form onSubmit={handleAddTodo} className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                placeholder="Enter new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1 p-3 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-semibold"
              >
                Add
              </button>
            </form>

            {/* Todos List */}
            <h2 className="text-lg font-semibold text-indigo-300 mb-4">Your Todos</h2>
            {todos.length > 0 ? (
              <ul className="space-y-3">
                {todos.map((todo) => (
                  <li
                    key={todo._id}
                    className={`p-3 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center transition ${
                      todo.completed
                        ? "bg-green-700/30 text-gray-400 line-through"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    <span>{todo.task}</span>

                    <div className="flex gap-2 mt-3 sm:mt-0">
                      <button
                        onClick={() => toggleTodo(todo._id)}
                        className={`px-3 py-1 text-sm font-medium rounded-md transition ${
                          todo.completed
                            ? "bg-green-600 hover:bg-green-500"
                            : "bg-indigo-600 hover:bg-indigo-500"
                        }`}
                      >
                        {todo.completed ? "Undo" : "Done"}
                      </button>

                      <button
                        onClick={() => deleteTodo(todo._id)}
                        className="px-3 py-1 text-sm font-medium rounded-md bg-red-600 hover:bg-red-500 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No todos yet. Create one!</p>
            )}
          </div>

          {/* 🗓️ Calendar Section */}
          <div className="bg-red-600/30 border border-red-700 rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-md">
            <h1 className="text-3xl font-bold text-white mb-2">📅 Calendar</h1>
            <p className="text-gray-200">Coming soon — track your daily habits visually!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
