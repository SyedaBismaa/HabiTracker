import React from 'react'
import DashboardLayout from '../layout/DashboardLayout'
import LeaderboardTabs from '../components/LeaderBoardcomponents/Leadertabs'

const LeaderBoard = () => {
  return (
    <div className="flex w-full min-h-screen bg-gray-900 text-white">

      {/* LEFT SIDEBAR */}
      <DashboardLayout />

      {/* RIGHT CONTENT AREA */}
      <div className="flex-1 p-6 md:p-10 ">

        <div className="max-w-2xl mx-auto">
          <h1 className="text-center text-3xl font-bold mb-6">
            🏆 Leaderboard
          </h1>

          <LeaderboardTabs />
        </div>

      </div>

    </div>
  )
}

export default LeaderBoard
