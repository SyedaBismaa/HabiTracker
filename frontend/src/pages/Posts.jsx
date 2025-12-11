import React, { useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import CreatePost from "../components/postcoomponents/CreatePost";
import PostFeed from "../components/postcoomponents/PostFeed";

const Posts = () => {
  const [refresh, setRefresh] = useState(false);
  const refreshFeed = () => setRefresh(!refresh);

  return (
    <DashboardLayout>

      <div className="flex-1  min-w-full">
        
        <h1 className="text-xl font-bold ">Community Posts</h1>
        <p className="text-gray-400 mb-6">Share your progress, habits, wins, and updates 🚀</p>
        <div className="max-w-5xl mx-auto ">  
          <CreatePost onPostCreated={refreshFeed} />
          <PostFeed refresh={refresh} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Posts;
