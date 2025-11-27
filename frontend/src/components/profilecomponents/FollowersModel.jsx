import React, { useEffect, useState } from "react";
import axios from "axios";
import UserListItem from "./UserListItem";

const FollowersModal = ({ username, isOpen, onClose }) => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (isOpen) fetchFollowers();
  }, [isOpen]);

  const fetchFollowers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/users/profile/${username}`
      );
      setFollowers(res.data.user.followers || []);
    } catch (error) {
      console.error("Followers fetch error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-40">
      <div className="bg-gray-900 w-80 max-h-[75vh] rounded-xl overflow-y-auto shadow-lg p-4">

        <h2 className="text-xl font-semibold text-white mb-4 text-center">
          Followers
        </h2>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {/* Followers List */}
        {followers.length === 0 ? (
          <p className="text-gray-400 text-center">No followers yet</p>
        ) : (
          followers.map((id) => (
            <UserListItem key={id} user={{ username: "loading", avatar: "", bio: "" }} />
          ))
        )}
      </div>
    </div>
  );
};

export default FollowersModal;
