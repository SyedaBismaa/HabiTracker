import { useState } from "react";
import LikesLeaderboard from "../LeaderBoardcomponents/LikesLeaderboard";
import StreakLeaderboard from "../LeaderBoardcomponents/StreakLeaderboard";

const LeaderboardTabs = () => {
  const [activeTab, setActiveTab] = useState("likes");

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 px-3">

      {/* Tabs */}
      <div className="flex justify-center gap-2 sm:gap-4 mb-4 flex-wrap">
        <button
          onClick={() => setActiveTab("likes")}
          className={`px-3 py-2 rounded-lg font-medium text-sm sm:text-base transition ${
            activeTab === "likes"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          ⭐ Top Creators
        </button>

        <button
          onClick={() => setActiveTab("streak")}
          className={`px-3 py-2 rounded-lg font-medium text-sm sm:text-base transition ${
            activeTab === "streak"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          🔥 Streak Leaders
        </button>
      </div>

      {/* Render Leaderboard */}
      {activeTab === "likes" ? <LikesLeaderboard /> : <StreakLeaderboard />}
    </div>
  );
};

export default LeaderboardTabs;
