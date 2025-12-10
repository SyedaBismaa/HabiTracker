import React from "react";
import FollowButton from "./FollowBtn";

const PublicProfileHeader = ({ user }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-6">

      {/* ----- FLEX LAYOUT ----- */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-8 text-center md:text-left">

        {/* Avatar */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <img
            src={user?.avatar}
            alt="avatar"
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border border-gray-700"
          />
        </div>

        {/* Right Section */}
        <div className="mt-4 md:mt-0 flex flex-col items-center md:items-start flex-1">

          {/* Username */}
          <h2 className="text-2xl md:text-3xl font-semibold">@{user?.username}</h2>

          {/* Bio */}
          {user?.bio && (
            <p className="text-gray-300 mt-2 text-sm md:text-base max-w-xl">
              {user.bio}
            </p>
          )}

          {/* XP */}
          <p className="text-sm text-gray-400 mt-3 gap-3">
            XP: <span className="text-white font-semibold">{user?.xp}</span>
            {"  |  "}
           Streak: <span className="text-white font-semibold">{user?.streak || 0}</span>
      

          </p>

          {/* Follow Button */}
          <div className="mt-4">
            <FollowButton username={user?.username} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfileHeader;
