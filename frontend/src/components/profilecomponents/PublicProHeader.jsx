import React from "react";
import FollowButton from "./FollowBtn";

const PublicProfileHeader = ({ user }) => {
  return (
    <div className="w-full max-w-2xl flex flex-col items-center text-center mt-4">

      {/* Avatar */}
      <img
        src={user?.avatar}
        alt="avatar"
        className="w-28 h-28 rounded-full object-cover border border-gray-700"
      />

      {/* Username */}
      <h2 className="text-2xl font-semibold mt-3">@{user?.username}</h2>

      {/* Bio */}
      {user?.bio && (
        <p className="text-gray-300 mt-2 text-sm w-[90%]">
          {user.bio}
        </p>
      )}

      {/* XP */}
      <p className="text-sm text-gray-400 mt-3">
        XP: <span className="text-white font-semibold">{user?.xp}</span>
      </p>

      {/* Follow Button */}
      <div className="mt-4">
        <FollowButton username={user?.username} />
      </div>

    </div>
  );
};

export default PublicProfileHeader;
