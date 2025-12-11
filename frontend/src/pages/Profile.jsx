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

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    if (stored) {
      setUser(stored);
      updateStreak(); // LOG: calling updateStreak
      fetchStreaks(); // LOG: calling fetchStreaks
      fetchUserPosts(stored._id || stored.id);
    } else {
      setLoading(false);
    }
  }, []);

  const updateStreak = async () => {
    try {
      // LOG: updateStreak() request sent
      const res = await axios.post(
        "http://localhost:3000/streak/update",
        {},
        { withCredentials: true }
      );
      // LOG: updateStreak() response
      console.log("LOG: updateStreak response →", res.data);
    } catch (err) {
      console.log("LOG: updateStreak error →", err);
    }
  };

  const fetchStreaks = async () => {
    try {
      // LOG: fetchStreaks() request sent
      const res = await axios.get("http://localhost:3000/streak", {
        withCredentials: true,
      });
      console.log("LOG: fetchStreaks response →", res.data);
      setStreak(res.data.streak ?? 0);
    } catch (err) {
      console.log("LOG: fetchStreaks error →", err);
    }
  };

  const fetchUserPosts = async (userId) => {
    try {
      // LOG: fetching posts
      const res = await axios.get(
        `http://localhost:3000/posts/user/${userId}`,
        { withCredentials: true }
      );
      console.log("LOG: posts response →", res.data);
      setPosts(res.data.posts || []);
    } catch (e) {
      console.log("LOG: posts error →", e);
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
      <div className="p-6 min-h-screen text-white flex flex-col items-center">

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
