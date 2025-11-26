import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import CreatePost from "../components/postcoomponents/CreatePost";
import PostFeed from "../components/postcoomponents/PostFeed";

const Posts = () => {
  const [refresh, setRefresh] = useState(false);
  const refreshFeed = () => setRefresh(!refresh);

  return (
    <div className="flex bg-gray-900 text-white min-h-screen">
      <DashboardLayout />

      {/* Main Feed Area */}
      <div className="flex-1 p-4">
        
        <h1 className="text-3xl font-bold mb-2">Community Posts</h1>
        <p className="text-gray-400 mb-6">Share your progress, habits, wins, and updates 🚀</p>

        {/* FEED WRAPPER — WIDER WIDTH */}
        <div className="max-w-3xl mx-auto">  
          
          {/* Create Post */}
          <CreatePost onPostCreated={refreshFeed} />

          {/* Feed */}
          <PostFeed refresh={refresh} />
        </div>
      </div>
    </div>
  );
};

export default Posts;
