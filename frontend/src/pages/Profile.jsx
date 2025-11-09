import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);

  // Get user from localStorage (assuming you stored it during login)
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchStreaks(storedUser._id);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch streaks from backend
  const fetchStreaks = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/streak/${userId}`);
      setStreak(res.data.totalStreaks || 0);
    } catch (error) {
      console.error("Error fetching streaks:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen text-white text-lg">
          Loading profile...
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen text-white text-lg">
          No user found. Please log in.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <div className="bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
          <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-3">
            User Profile
          </h2>

          <div className="space-y-4 text-left">
            <div className="flex justify-between">
              <span className="text-gray-400">Name:</span>
              <span className="font-semibold">{user.username}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Email:</span>
              <span className="font-semibold">{user.email}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Total Streaks:</span>
              <span className="font-semibold text-indigo-400">{streak}</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
