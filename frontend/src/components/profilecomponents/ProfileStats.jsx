import React from "react";

const ProfileStats = ({ user, onFollowersClick, onFollowingClick }) => {
  return (
    <div className="w-full max-w-2xl mt-6 flex justify-center">
      <div className="flex gap-10 text-center">

        {/* Followers */}
        <div
          className="cursor-pointer hover:text-white transition"
          onClick={onFollowersClick}
        >
          <p className="text-lg font-semibold text-white">
            {user?.followers?.length || 0}
          </p>
          <p className="text-gray-400 text-sm">Followers</p>
        </div>

        {/* Following */}
        <div
          className="cursor-pointer hover:text-white transition"
          onClick={onFollowingClick}
        >
          <p className="text-lg font-semibold text-white">
            {user?.following?.length || 0}
          </p>
          <p className="text-gray-400 text-sm">Following</p>
        </div>

        {/* Posts */}
        <div>
          <p className="text-lg font-semibold text-white">
            {user?.posts?.length || 0}
          </p>
          <p className="text-gray-400 text-sm">Posts</p>
        </div>

      </div>
    </div>
  );
};

export default ProfileStats;
