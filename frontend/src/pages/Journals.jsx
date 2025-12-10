import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import { Trash2, BookOpen } from "lucide-react";

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
    if (!window.confirm("Delete this journal?")) return;

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
    <DashboardLayout>
      <div className="p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Your Journals</h1>

          <Link
            to="/journals/new"
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium"
          >
            + Add Journal
          </Link>
        </div>

        {/* Journal List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {journals.map((j) => (
            <div
              key={j._id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:shadow-lg hover:shadow-indigo-600/10 transition relative"
            >
              <Link to={`/journals/${j._id}`}>
                <h2 className="text-xl font-semibold flex items-center gap-2 mb-1">
                  <BookOpen size={18} className="text-indigo-400" />
                  {j.title}
                </h2>

                <p className="text-gray-400 text-sm mb-2">
                  {new Date(j.createdAt).toLocaleDateString()}
                </p>

                <p className="text-gray-400 line-clamp-2">
                  {j.content || "No content yet..."}
                </p>
              </Link>

              {/* delete button */}
              <button
                onClick={() => DeleteHandler(j._id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-400 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {journals.length === 0 && (
          <p className="text-gray-500 text-center mt-20">
            No journals yet. Create your first entry!
          </p>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Journals;
