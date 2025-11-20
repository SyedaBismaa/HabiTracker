import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import axios from "axios";
import { Link } from "react-router-dom";

const Journals = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const res = await axios.get("http://localhost:3000/journals", {
        withCredentials: true,
      });
      setJournals(res.data.journals);
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteHandler = async (id) => {
    const confirmDelete = window.confirm("Delete this journal?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/journals/${id}`, {
        withCredentials: true,
      });

      setJournals((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex bg-gray-900 min-h-screen text-white">
      <DashboardLayout />

      <div className="w-full p-10">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold mb-6">Your Journals</h1>

          <Link
            to="/journals/new"
            className="block w-40 mb-6 border border-gray-700 rounded-lg p-2 text-center text-gray-300 hover:bg-gray-800"
          >
            + Add new…
          </Link>
        </div>

        <div className="space-y-4">
          {journals.map((j) => (
            <div
              key={j._id}
              className="border border-gray-700 rounded-lg p-4 hover:bg-gray-800 flex justify-between items-start"
            >
              {/* Clickable area */}
              <Link to={`/journals/${j._id}`} className="w-full">
                <h2 className="text-xl font-semibold">{j.title}</h2>
                <p className="text-sm text-gray-400">
                  {new Date(j.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-400 mt-1 line-clamp-1">
                  {j.content || "No content yet..."}
                </p>
              </Link>

              {/* Delete button at right side */}
              <button
                onClick={() => DeleteHandler(j._id)}
                className="ml-4 p-2 bg-red-600 border border-red-900 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Journals;
