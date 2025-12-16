import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart, Trash2, MessageCircle, X } from "lucide-react";
import { toast } from "react-toastify";

const PostCard = ({ post, onDelete }) => {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const userId = loggedUser?._id || loggedUser?.id;

  // 🔍 DEBUG LOGS
  useEffect(() => {
    console.log("──────── POST DEBUG ────────");
    console.log("Logged User ID:", userId);
    console.log("Post ID:", post._id);
    console.log("Post User RAW:", post.user);
    console.log(
      "Post User ID:",
      typeof post.user === "object" ? post.user?._id : post.user
    );
    console.log(
      "IS OWNER:",
      String(userId) ===
        String(typeof post.user === "object" ? post.user?._id : post.user)
    );
    console.log("───────────────────────────");
  }, [post, userId]);

  // OWNER CHECK
  const postUserId =
    typeof post.user === "object" ? post.user?._id : post.user;

  const isOwner = String(userId) === String(postUserId);

  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(
    post.likes?.includes(userId) || false
  );
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");

  // 🔥 IMAGE MODAL STATE
  const [showImage, setShowImage] = useState(false);

  // LIKE
  const handleLike = async () => {
    try {
      const res = await axios.put(
        `https://habitracker-y4i5.onrender.com/posts/like/${post._id}`,
        {},
        { withCredentials: true }
      );
      setLikes(res.data.post.likes.length);
      setLiked(res.data.post.likes.includes(userId));
    } catch {
      toast.error("Failed to like post");
    }
  };

  // DELETE POST
  const handleDeletePost = async () => {
    try {
      await axios.delete(
        `https://habitracker-y4i5.onrender.com/posts/delete/${post._id}`,
        { withCredentials: true }
      );
      toast.success("Post deleted");
      onDelete && onDelete(post._id);
    } catch {
      toast.error("Delete failed");
    }
  };

  // ADD COMMENT
  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        `https://habitracker-y4i5.onrender.com/posts/comment/${post._id}`,
        { text: commentText },
        { withCredentials: true }
      );
      setComments(res.data.post.comments);
      setCommentText("");
    } catch {
      toast.error("Comment failed");
    }
  };

  return (
    <>
      <div className="bg-gray-900 border border-gray-700 p-4 rounded-2xl shadow mb-4 text-white">

        {/* HEADER */}
        <div className="flex items-center mb-3">
          <img
            src={
              typeof post.user === "object"
                ? post.user?.avatar || ""
                : ""
            }
            alt="avatar"
            className="w-10 h-10 rounded-full border object-cover"
          />

          <div className="ml-3 flex-1">
            <p className="font-semibold">
              {typeof post.user === "object"
                ? post.user?.username || "Unknown"
                : "Unknown"}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>

          {/* DELETE ICON */}
          {isOwner && (
            <button
              onClick={handleDeletePost}
              className="text-red-500 bg-yellow-800 hover:text-red-600"
            >
              <Trash2 size={18} />
            </button>
          )}
        </div>

        {/* CONTENT */}
        <p className="mb-3">{post.content}</p>

        {/* IMAGE PREVIEW */}
        {post.image && (
          <div
            className="w-full h-64 rounded-xl overflow-hidden mb-3 bg-gray-800 cursor-pointer"
            onClick={() => setShowImage(true)}
          >
            <img
              src={post.image}
              alt="post"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
              liked ? "bg-red-500" : "bg-gray-700"
            }`}
          >
            <Heart size={18} fill={liked ? "white" : "none"} />
            {likes}
          </button>

          <div className="flex items-center gap-1">
            <MessageCircle size={18} />
            {comments.length}
          </div>
        </div>

        {/* COMMENT INPUT */}
        <div className="flex gap-2">
          <input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 px-3 py-2 bg-gray-800 rounded-lg outline-none"
          />
          <button
            onClick={handleComment}
            className="px-4 py-2 bg-indigo-600 rounded-lg"
          >
            Post
          </button>
        </div>
      </div>

      {/* 🔥 FULL IMAGE MODAL */}
      {showImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setShowImage(false)}
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowImage(false)}
              className="absolute -top-10 right-0 text-white"
            >
              <X size={28} />
            </button>

            <img
              src={post.image}
              alt="full"
              className="max-w-full max-h-[90vh] rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;
