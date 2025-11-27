import React from "react";

const ProfileHeader = ({ user, streak }) => {
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

      {/* XP + Streak */}
      <div className="flex gap-4 mt-4 text-sm text-gray-400">
        <span>XP: <span className="font-semibold text-white">{user?.xp}</span></span>
        <span>🔥 Streak: <span className="font-semibold text-white">{streak}</span></span>
      </div>

    </div>
  );
};

export default ProfileHeader;
