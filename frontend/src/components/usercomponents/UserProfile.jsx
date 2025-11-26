import React from "react";

const UserProfile = ({ user, streak }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-lg shadow-lg">

      <h2 className="text-3xl font-bold text-center mb-6">
        {user.username}
      </h2>

      {/* STATS ROW */}
      <div className="grid grid-cols-3 text-center mb-6">
        <div>
          <p className="text-gray-400 text-sm">XP</p>
          <p className="text-xl font-bold text-indigo-400">{user.xp || 0}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Followers</p>
          <p className="text-xl font-bold">{user.followers?.length || 0}</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Following</p>
          <p className="text-xl font-bold">{user.following?.length || 0}</p>
        </div>
      </div>

      {/* Streaks */}
      <div className="bg-gray-700 rounded-xl p-4 text-center mb-4">
        <p className="text-gray-400 text-sm">Total Streaks</p>
        <p className="text-2xl font-bold text-indigo-400">{streak}</p>
      </div>

      {/* BIO */}
      <div className="bg-gray-700 rounded-xl p-4">
        <p className="text-gray-400 text-sm mb-2">Bio</p>
        <p className="text-gray-200">{user.bio || "No bio added."}</p>
      </div>
    </div>
  );
};

export default UserProfile;
