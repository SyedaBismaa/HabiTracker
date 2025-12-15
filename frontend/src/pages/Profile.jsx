import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import axios from "axios";

import ProfileHeader from "../components/profilecomponents/ProfileHeader";
import ProfileStats from "../components/profilecomponents/ProfileStats";
import FollowersModal from "../components/profilecomponents/FollowersModel";
import FollowingModal from "../components/profilecomponents/FollowingModel";
import UserPostsGrid from "../components/profilecomponents/UserPostGrid";
import EditProfileModal from "../components/usercomponents/EditProfileModal";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [streak, setStreak] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "https://habitracker-y4i5.onrender.com/auth/me",
        { withCredentials: true }
      );

      setUser(res.data.user);
      updateStreak();
      fetchStreaks();
      fetchUserPosts(res.data.user._id);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);



  const updateStreak = async () => {
    try {
      const res = await axios.post(
        "https://habitracker-y4i5.onrender.com/streak/update",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      toast.error("Error updating streak");
    }
  };

  const fetchStreaks = async () => {
    try {
      
      const res = await axios.get("https://habitracker-y4i5.onrender.com/streak", {
        withCredentials: true,
      });
      setStreak(res.data.streak ?? 0);
    } catch (err) {
      toast.error("Error fetching streak please refresh the page");
    }
  };

  const fetchUserPosts = async (userId) => {
    try {
      const res = await axios.get(
        `https://habitracker-y4i5.onrender.com/posts/user/${userId}`,
        { withCredentials: true }
      );
      setPosts(res.data.posts || []);
    } catch (e) {
      toast.error("Error fetching user posts");
    } finally {
      setLoading(false);
    }
  };

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
      <div className="p-6 min-h-[100dvh] text-white flex flex-col items-center">

        <ProfileHeader user={user} streak={streak} />

        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl"
        >
          Edit Profile
        </button>

        <ProfileStats
          user={user}
          postCount={posts.length}
          onFollowersClick={() => setFollowersOpen(true)}
          onFollowingClick={() => setFollowingOpen(true)}
        />

        <UserPostsGrid posts={posts} />

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
