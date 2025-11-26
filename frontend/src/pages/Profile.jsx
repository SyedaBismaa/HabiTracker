import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import axios from "axios";

import Avatar from "../components/usercomponents/AvatarUpload";
import UserProfile from "../components/usercomponents/UserProfile";
import EditProfileModal from "../components/usercomponents/EditProfileModal";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // ------------------------------------
  // Load user from localStorage
  // ------------------------------------
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) {
      setUser(stored);
      fetchStreaks(stored._id || stored.id);
    } else {
      setLoading(false);
    }
  }, []);

  // ------------------------------------
  // Fetch streaks
  // ------------------------------------
  const fetchStreaks = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:3000/streak/${userId}`);
      setStreak(res.data.totalStreaks || 0);
    } catch (error) {
      console.error("Error fetching streaks:", error);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------
  // After updating profile (avatar, username, bio)
  // ------------------------------------
  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);

    // update localStorage
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // ------------------------------------
  // Loading State
  // ------------------------------------
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full text-white">
          Loading profile...
        </div>
      </DashboardLayout>
    );
  }

  // ------------------------------------
  // No user found
  // ------------------------------------
  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full text-white">
          No user found. Please log in.
        </div>
      </DashboardLayout>
    );
  }

  // ------------------------------------
  // UI
  // ------------------------------------
  return (
    <DashboardLayout>
      <div className="p-6 min-h-screen bg-gray-900 text-white flex flex-col items-center">

        {/* AVATAR */}
        <Avatar src={user.avatar} size="w-32 h-32" />

        {/* EDIT BUTTON */}
        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
        >
          Edit Profile
        </button>

        {/* USER INFO CARD */}
        <div className="mt-6 w-full flex justify-center">
          <UserProfile user={user} streak={streak} />
        </div>

        {/* EDIT MODAL */}
        <EditProfileModal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          user={user}
          onUpdate={handleProfileUpdate}
        />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
