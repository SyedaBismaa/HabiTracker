import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import axios from "axios";

import ProfileHeader from "../components/profilecomponents/ProfileHeader";
import ProfileStats from "../components/profilecomponents/ProfileStats";
import FollowersModal from "../components/profilecomponents/FollowersModel";
import FollowingModal from "../components/profilecomponents/FollowingModel";
import UserPostsGrid from "../components/profilecomponents/UserPostGrid";
import EditProfileModal from "../components/usercomponents/EditProfileModal";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [streak, setStreak] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Load current user from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) {
      setUser(stored);
      fetchStreaks(stored._id || stored.id);
      fetchUserPosts(stored._id || stored.id);

    } else {
      setLoading(false);
    }
  }, []);

  // Fetch streaks
// replace your fetchStreaks with this
const fetchStreaks = async () => {
  try {
    console.log("Fetching streak from: http://localhost:3000/streak");
    const res = await axios.get("http://localhost:3000/streak", {
      withCredentials: true, // important if auth uses cookies
    });
    console.log("streak response:", res.status, res.data);
    setStreak(res.data.streak ?? res.data.totalStreaks ?? 0);
  } catch (err) {
    console.error("streak fetch error (full):", err);
    if (err.response) {
      console.error("response data:", err.response.data);
      console.error("response status:", err.response.status);
      console.error("response headers:", err.response.headers);
    } else {
      console.error("no response (network / CORS / server down)", err.message);
    }
  } finally {
    setLoading(false);
  }
};


  // Fetch user's posts
const fetchUserPosts = async (userId) => {
  try {
    const res = await axios.get(
      `http://localhost:3000/posts/user/${userId}`,
      { withCredentials: true }
    );
    setPosts(res.data.posts || []);
  } catch (e) {
    console.log(e);
  }
};


  // After updating profile
  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  if (loading || !user) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full text-white">
          Loading profile...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 min-h-screen text-white flex flex-col items-center">

        {/* Profile Header */}
        <ProfileHeader user={user} streak={streak} />

        {/* Edit Profile Button */}
        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
        >
          Edit Profile
        </button>

        {/* Profile Stats */}
        <ProfileStats
          user={user}
          onFollowersClick={() => setFollowersOpen(true)}
          onFollowingClick={() => setFollowingOpen(true)}
        />

        {/* User Posts Grid */}
        <UserPostsGrid posts={posts} />

        {/* Modals */}
        <FollowersModal
          username={user.username}
          isOpen={followersOpen}
          onClose={() => setFollowersOpen(false)}
        />

        <FollowingModal
          username={user.username}
          isOpen={followingOpen}
          onClose={() => setFollowingOpen(false)}
        />

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
