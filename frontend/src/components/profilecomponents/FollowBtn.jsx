import React, { useEffect, useState } from "react";
import axios from "axios";

const FollowButton = ({ username, onFollowUpdate }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  // Fetch follow state on load
  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/users/check-follow/${username}`,
          { withCredentials: true }
        );
        setIsFollowing(res.data.following);
      } catch (error) {
        console.error("Check follow error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser && currentUser.username !== username) {
      checkFollowStatus();
    } else {
      setLoading(false);
    }
  }, [username]);

  // Follow / Unfollow

  const toggleFollow = async () => {
    try {
      setIsFollowing(!isFollowing); // Optimistic UI

      const url = isFollowing
        ? `http://localhost:3000/users/unfollow/${username}`
        : `http://localhost:3000/users/follow/${username}`;

      const res = await axios.post(url, {}, { withCredentials: true });

      if (onFollowUpdate) {
        onFollowUpdate(res.data.user);
      }

    } catch (error) {
      console.error("Follow/unfollow error:", error);
      setIsFollowing(isFollowing); // revert if failed
    }
  };

  // Loading State

  if (loading) {
    return (
      <button className="px-4 py-2 bg-gray-700 rounded-xl animate-pulse">
        Loading...
      </button>
    );
  }


  if (currentUser?.username === username) return null;

  return (
    <button
      onClick={toggleFollow}
      className={`px-4 py-2 rounded-xl transition 
        ${isFollowing ? "bg-gray-700 hover:bg-gray-600" : "bg-indigo-600 hover:bg-indigo-700"}`}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
