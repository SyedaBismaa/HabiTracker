import React from "react";

const ProfileHeader = ({ user, streak }) => {
  return (
    <div
      className="
        w-full max-w-4xl 
        flex flex-col items-center text-center 
        md:flex-row md:items-start md:text-left 
        gap-6 mt-6 mx-auto
      "
    >
      {/* Avatar */}
     <img
  src={`${user?.avatar}?t=${Date.now()}`}
  alt="avatar"
  className="
    w-28 h-28 md:w-32 md:h-32 
    rounded-full object-cover 
    border border-gray-700
  "
/>


      {/* Right section */}
      <div className="flex flex-col items-center md:items-start w-full">

        {/* Username */}
        <h2 className="text-2xl md:text-3xl font-semibold">
          @{user?.username}
        </h2>

        {/* Bio */}
        {user?.bio && (
          <p className="text-gray-300 mt-2 text-sm md:text-base w-full md:w-[80%]">
            {user.bio}
          </p>
        )}

        {/* XP + Streak */}
        <div className="flex gap-6 mt-4 text-sm md:text-base text-gray-400">
          <span>
            XP:{" "}
            <span className="font-semibold text-white">
              {user?.xp}
            </span>
          </span>
          <span>
            🔥 Streak:{" "}
            <span className="font-semibold text-white">
              {streak}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
