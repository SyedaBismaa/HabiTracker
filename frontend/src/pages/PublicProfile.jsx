import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import PublicProfileHeader from "../components/profilecomponents/PublicProHeader";
import ProfileStats from "../components/profilecomponents/ProfileStats";
import FollowersModal from "../components/profilecomponents/FollowersModel";
import FollowingModal from "../components/profilecomponents/FollowingModel";
import UserPostsGrid from "../components/profilecomponents/UserPostGrid";
import DashboardLayout from "../layout/DashboardLayout";

const PublicProfile = () => {
  const { username } = useParams();

  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [followersOpen, setFollowersOpen] = useState(false);
  const [followingOpen, setFollowingOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/users/profile/${username}`,
          { withCredentials: true }
        );

        setUserData(res.data.user);

        // Posts
        const p = await axios.get(
          `http://localhost:3000/posts/user/${res.data.user._id}`,
          { withCredentials: true }
        );
        setPosts(p.data.posts || []);
      } catch (err) {
        console.error("Public profile error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center text-white">
          Loading profile...
        </div>
      </DashboardLayout>
    );
  }

  if (!userData) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center text-white">
          User not found
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-900 text-white px-4 py-6 flex flex-col items-center">

        {/* HEADER */}
        <PublicProfileHeader 
          user={userData}
          onFollowUpdate={(updatedUser) => setUserData(updatedUser)}
        />

        {/* STATS */}
        <ProfileStats
          user={userData}
          postCount={posts.length}
          onFollowersClick={() => setFollowersOpen(true)}
          onFollowingClick={() => setFollowingOpen(true)}
        />

        {/* POSTS */}
        <UserPostsGrid posts={posts} />

        {/* FOLLOWERS MODAL */}
        <FollowersModal
          username={username}
          isOpen={followersOpen}
          onClose={() => setFollowersOpen(false)}
        />

        {/* FOLLOWING MODAL */}
        <FollowingModal
          username={username}
          isOpen={followingOpen}
          onClose={() => setFollowingOpen(false)}
        />

      </div>
    </DashboardLayout>
  );
};

export default PublicProfile;
