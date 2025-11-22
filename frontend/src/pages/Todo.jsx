import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layout/DashboardLayout";
import Calendar from "../components/Calender";

const Todo = () => {
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
    <div className="flex min-h-screen  bg-gray-900 text-white">
      <DashboardLayout />

      {/* Main Section */}
      <div className="flex-1 ml-16 sm:ml-20 p-5 md:p-8 lg:p-10 transition-all">
        {/* Header */}
        <div className="m-5 p-2 border-gray-700 border-1 rounded-full justify-center items-start flex flex-col">
          <h1 className="text-3xl font-semibold  ">
            👋 Hi, <span className="text-indigo-400">{user?.username || "User"}</span>
          </h1>
          <p className="text-gray-400 mt-2 ml-2 text-sm sm:text-base">
            Here are your tasks for today:
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* 📝 Todo Section */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg shadow-indigo-900/10">
            <form onSubmit={handleAddTodo} className="flex flex-col sm:flex-row gap-3 mb-6">
              <input
                type="text"
                placeholder="Enter new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg font-semibold transition"
              >
                Add
              </button>
            </form>

            <h2 className="text-xl font-semibold text-indigo-300 mb-4">Your Todos</h2>

            {todos.length > 0 ? (
              <ul className="space-y-3">
                {todos.map((todo) => (
                  <li
                    key={todo._id}
                    className={`p-4 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center transition-all duration-300 shadow-md ${
                      todo.completed
                        ? "bg-green-700/20 border border-green-600 text-gray-400 line-through"
                        : "bg-gray-800 border border-gray-700 hover:bg-gray-700/80"
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
              <p className="text-gray-400 text-center py-10">No todos yet. Create one!</p>
            )}
          </div>

          {/* 🗓️ Calendar Section */}
          <div className=" h-120 bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-lg shadow-indigo-900/10 flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold text-indigo-300 mb-4">
              📅 Your Calendar
            </h2>
            <div className="w-full max-w-sm">
              <Calendar />
            </div>
            <p className="text-gray-400 text-sm mt-4 text-center">
              View your monthly overview — habit tracking coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
