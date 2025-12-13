import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";

const PostsFeed = ({ refresh }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPosts = async (pageNumber) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:3000/posts?page=${pageNumber}`,
        { withCredentials: true }
      );

      const newPosts = res.data.posts || [];

      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => [...prev, ...newPosts]);
      }

    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts when page changes
  useEffect(() => {
    getPosts(page);
  }, [page]);

  // Reset feed when refresh toggles (new post created)
  useEffect(() => {
    setPosts([]);
    setPage(1);
    setHasMore(true);
  }, [refresh]);

  // Infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setPage(prev => prev + 1);
      }
    });

    const sentinel = document.getElementById("scroll-sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, loading]);

  const handleDeletePost = (id) => {
    setPosts(prev => prev.filter(post => post._id !== id));
  };

  return (
    <div className="mt-4 space-y-4">
      {posts.map(post => (
        <PostCard
          key={post._id}
          post={post}
          onDelete={handleDeletePost}
        />
      ))}

      {loading && (
        <div className="animate-pulse space-y-3">
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        </div>
      )}

      <div id="scroll-sentinel" className="h-10" />

      {!hasMore && !loading && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No more posts 🎉
        </p>
      )}
    </div>
  );
};

export default PostsFeed;
