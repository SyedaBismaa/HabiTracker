import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard";

const PostsFeed = ({ refresh }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/posts?page=${page}`,
        { withCredentials: true }
      );

      if (res.data.posts.length === 0) {
        setHasMore(false);
      }

      setPosts(prev => [...prev, ...res.data.posts]);
    } catch (error) {
      console.log("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = (id) => {
    setPosts(prev => prev.filter(p => p._id !== id));
  };

  useEffect(() => {
    getPosts();
  }, [page, refresh]);

  // Infinite Scroll
  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1 }
    );

    const sentinel = document.getElementById("scroll-sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <div className="mt-4 space-y-4">
      {posts.map(post => (
        <PostCard key={post._id} post={post} onDelete={handleDeletePost} />
      ))}

      {loading && (
        <div className="animate-pulse space-y-3">
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        </div>
      )}

      {/* Infinite scroll trigger */}
      <div id="scroll-sentinel" className="h-10"></div>

      {!hasMore && (
        <p className="text-center text-gray-500 dark:text-gray-400">
          No more posts 🎉
        </p>
      )}
    </div>
  );
};

export default PostsFeed;
