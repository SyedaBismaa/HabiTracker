import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";

const PostsFeed = ({ refresh }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:3000/posts", {
        withCredentials: true,
      });

      setPosts(res.data.posts);
    } catch (error) {
      console.log("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = (id) => {
  setPosts((prev) => prev.filter((p) => p._id !== id));
};


  useEffect(() => {
    getPosts();
  }, [refresh]);

  return (
    <div className="mt-4 space-y-4  ">
      {loading ? (
        // ⌛ Loading skeleton
        <div className="animate-pulse space-y-3">
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        </div>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-6">
          No posts yet. Be the first to post! 🚀
        </p>
      ) : (
       posts.map((post) => (
  <PostCard 
    key={post._id} 
    post={post} 
    onDelete={handleDeletePost} 
  />
))

      )}
    </div>
  );
};

export default PostsFeed;
