import React, { useState } from "react";
import axios from "axios";
import { Heart, Trash2, MessageCircle } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const PostCard = ({ post, onDelete }) => {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const userId = loggedUser?._id || loggedUser?.id;

  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(post.likes.includes(userId));
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");
  const [showImage, setShowImage] = useState(false);

  const isOwner = post.user?._id?.toString() === userId?.toString();

  const handleLike = async () => {
    const res = await axios.put(
      `https://habitracker-y4i5.onrender.com/posts/like/${post._id}`,
      {},
      { withCredentials: true }
    );
    setLikes(res.data.post.likes.length);
    setLiked(res.data.post.likes.includes(userId));
  };

  const handleDeletePost = async () => {
    await axios.delete(
      `https://habitracker-y4i5.onrender.com/posts/delete/${post._id}`,
      { withCredentials: true }
    );
    toast.success("Post deleted");
    onDelete && onDelete(post._id);
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    const res = await axios.post(
      `https://habitracker-y4i5.onrender.com/posts/comment/${post._id}`,
      { text: commentText },
      { withCredentials: true }
    );
    setComments(res.data.post.comments);
    setCommentText("");
  };

  return (
    <div className="bg-gray-900 border border-gray-700 p-4 rounded-2xl shadow mb-4 text-white">

      {/* Header */}
      <div className="flex items-center mb-3">
        <Link to={`/profile/${post.user?.username}`}>
          <img
            src={post.user?.avatar}
            className="w-10 h-10 rounded-full border object-cover"
            alt="avatar"
          />
        </Link>

        <div className="ml-3 flex-1">
          <Link to={`/profile/${post.user?.username}`}>
            <p className="font-semibold">{post.user?.username}</p>
          </Link>
          <p className="text-xs text-gray-400">
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>

        {isOwner && (
          <button onClick={handleDeletePost} className="text-red-500">
            <Trash2 size={18} />
          </button>
        )}
      </div>

      <p className="mb-3">{post.content}</p>

      {post.image && (
        <img
          src={post.image}
          className="w-full rounded-xl mb-3 cursor-pointer"
          onClick={() => setShowImage(true)}
        />
      )}

      <div className="flex gap-3 mb-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg ${
            liked ? "bg-red-500" : "bg-gray-700"
          }`}
        >
          <Heart size={18} fill={liked ? "white" : "none"} />
          {likes}
        </button>

        <div className="flex items-center gap-1 text-gray-300">
          <MessageCircle size={18} />
          {comments.length}
        </div>
      </div>

      <div className="flex gap-2">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 px-3 py-2 bg-gray-800 rounded-lg outline-none"
        />
        <button
          onClick={handleComment}
          className="px-3 py-1 bg-indigo-600 rounded-lg"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default PostCard;
