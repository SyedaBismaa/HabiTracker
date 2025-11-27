import React from "react";
import { Link } from "react-router-dom";

const UserListItem = ({ user }) => {
  return (
    <Link
      to={`/profile/${user.username}`}
      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition"
    >
      {/* Avatar */}
      <img
        src={user.avatar}
        alt="pfp"
        className="w-10 h-10 rounded-full object-cover border border-gray-700"
      />

      {/* Username */}
      <div>
        <p className="text-white font-semibold">@{user.username}</p>
        {user.bio && (
          <p className="text-gray-400 text-sm">{user.bio}</p>
        )}
      </div>
    </Link>
  );
};

export default UserListItem;
