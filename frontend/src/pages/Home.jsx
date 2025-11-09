import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const Home = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧩 Fetch user + todos
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
        console.error("❌ Error fetching data:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndTodos();
  }, []);

  // ✅ Toggle todo completion
  const toggleTodo = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/todos/${id}`,
        {},
        { withCredentials: true }
      );

      // Update UI instantly without reloading
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, completed: res.data.completed } : todo
        )
      );
    } catch (error) {
      console.error("❌ Error toggling todo:", error);
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
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 ml-16">
        {/* User Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            👋 Hi, <span className="text-indigo-400">{user?.username || "User"}</span>
          </h1>
          <p className="text-gray-400 mt-1">
            Here are your tasks for today:
          </p>
        </div>

        {/* Todos */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md border border-gray-700">
          <h2 className="text-lg font-semibold text-indigo-300 mb-4">Your Todos</h2>

          {todos.length > 0 ? (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo._id}
                  className={`p-3 rounded-md flex justify-between items-center transition ${
                    todo.completed
                      ? "bg-green-700/30 text-gray-400 line-through"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <span>{todo.task}</span>

                  {/* ✅ Toggle Button */}
                  <button
                    onClick={() => toggleTodo(todo._id)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition ${
                      todo.completed
                        ? "bg-green-600 hover:bg-green-500"
                        : "bg-indigo-600 hover:bg-indigo-500"
                    }`}
                  >
                    {todo.completed ? "Undo" : "Mark as Done"}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No todos yet. Create one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
