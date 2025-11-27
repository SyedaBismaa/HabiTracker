import React, { useEffect, useState } from "react";
import axios from "axios";
import UserListItem from "./UserListItem";

const FollowingModal = ({ username, isOpen, onClose }) => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    if (isOpen) fetchFollowing();
  }, [isOpen]);

  const fetchFollowing = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/users/following/${username}`,
        { withCredentials: true }
      );
      setFollowing(res.data.following);
    } catch (error) {
      console.error("Following fetch error:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-40">
      <div className="bg-gray-900 w-80 max-h-[75vh] rounded-xl overflow-y-auto shadow-lg p-4 relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold text-white mb-4 text-center">
          Following
        </h2>

        {/* List */}
        {following.length === 0 ? (
          <p className="text-gray-400 text-center">Not following anyone</p>
        ) : (
          following.map((user) => (
            <UserListItem key={user._id} user={user} />
          ))
        )}
      </div>
    </div>
  );
};

export default FollowingModal;
