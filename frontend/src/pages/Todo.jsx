// VERSION A — SnapTodo Style
import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layout/DashboardLayout";

const Todo = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, todosRes] = await Promise.all([
          axios.get("http://localhost:3000/auth/user", { withCredentials: true }),
          axios.get("http://localhost:3000/todos", { withCredentials: true }),
        ]);

        setUser(userRes.data.user);
        setTodos(todosRes.data);
      } catch (error) {
        console.error("❌ Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

      setTodos([...todos, res.data]);
      setNewTask("");
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/todos/${id}`,
        {},
        { withCredentials: true }
      );

      setTodos((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed: res.data.completed } : t))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`, {
        withCredentials: true,
      });

      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-screen flex justify-center items-center text-white">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  // stats
  const completed = todos.filter((t) => t.completed).length;
  const pending = todos.length - completed;

  return (
    <DashboardLayout>
      <div className="p-6 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">
            Hello, <span className="text-indigo-400">{user?.username}</span> 👋
          </h1>
          <p className="text-gray-300 mt-1">Here’s your productivity overview for today</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-gray-800 rounded-xl border border-gray-700 shadow">
            <h3 className="text-gray-400 text-sm">Total Tasks</h3>
            <p className="text-3xl font-bold mt-1">{todos.length}</p>
          </div>

          <div className="p-5 bg-gray-800 rounded-xl border border-gray-700 shadow">
            <h3 className="text-gray-400 text-sm">Completed</h3>
            <p className="text-3xl font-bold mt-1 text-green-400">{completed}</p>
          </div>

          <div className="p-5 bg-gray-800 rounded-xl border border-gray-700 shadow">
            <h3 className="text-gray-400 text-sm">Pending</h3>
            <p className="text-3xl font-bold mt-1 text-yellow-400">{pending}</p>
          </div>
        </div>

        {/* Add Task */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow">
          <form onSubmit={handleAddTodo} className="flex gap-3 flex-col sm:flex-row">
            <input
              className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 text-white"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />

            <button
              className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-lg transition font-semibold"
            >
              Add
            </button>
          </form>
        </div>

        {/* Todo List */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>

          {todos.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No tasks yet. Add one above.</p>
          ) : (
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo._id}
                  className={`p-4 rounded-lg flex justify-between items-center border transition ${
                    todo.completed
                      ? "bg-green-700/20 border-green-600 line-through text-gray-400"
                      : "bg-gray-900 border-gray-700 hover:bg-gray-700/40"
                  }`}
                >
                  {todo.task}

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleTodo(todo._id)}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        todo.completed
                          ? "bg-green-600 hover:bg-green-500"
                          : "bg-indigo-600 hover:bg-indigo-500"
                      }`}
                    >
                      {todo.completed ? "Undo" : "Done"}
                    </button>

                    <button
                      onClick={() => deleteTodo(todo._id)}
                      className="px-3 py-1 text-sm bg-red-600 hover:bg-red-500 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Todo;
