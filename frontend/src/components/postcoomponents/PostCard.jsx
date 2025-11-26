import React, { useState } from "react";
import axios from "axios";
import { Heart, Trash2, MessageCircle } from "lucide-react";
import { toast } from "react-toastify";

const PostCard = ({ post, onDelete }) => {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const userId = loggedUser?._id || loggedUser?.id;

  const [likes, setLikes] = useState(post.likes.length);
  const [liked, setLiked] = useState(post.likes.includes(userId));
  const [comments, setComments] = useState(post.comments || []);
  const [commentText, setCommentText] = useState("");

  // LIKE
  const handleLike = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/posts/like/${post._id}`,
        {},
        { withCredentials: true }
      );

      setLikes(res.data.post.likes.length);
      setLiked(res.data.post.likes.includes(userId));
    } catch (error) {
      console.log("Error liking post:", error);
    }
  };

  // DELETE POST
  const handleDeletePost = async () => {

    try {
      await axios.delete(
        `http://localhost:3000/posts/delete/${post._id}`,
        { withCredentials: true }
      );

      toast.success("Post deleted!");
      onDelete && onDelete(post._id);
    } catch (err) {
      toast.error("Error deleting post");
      console.log("Error deleting post:", err);
    }
  };

  // ADD COMMENT
  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:3000/posts/comment/${post._id}`,
        { text: commentText },
        { withCredentials: true }
      );

      setComments(res.data.post.comments);
      setCommentText("");
    } catch (error) {
      console.log(error);
    }
  };


  const handleDeleteComment = async (commentId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/posts/comment/${post._id}/${commentId}`,
        { withCredentials: true }
      );

      setComments(res.data.post.comments);
      toast.success("Comment deleted!");
    } catch (error) {
      toast.error("Error deleting comment");
    }
  };

  const formatTime = (date) => new Date(date).toLocaleString();

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-2xl shadow-sm mb-4">

      {/* HEADER */}
      <div className="flex items-center mb-3">
        <img
          src={post.user?.avatar}
          className="w-10 h-10 rounded-full border object-cover"
        />

        <div className="ml-3 flex-1">
          <p className="font-semibold">{post.user?.username}</p>
          <p className="text-xs text-gray-500">
            {formatTime(post.createdAt)}
          </p>
        </div>

        {/* DELETE POST */}
        {userId === post.user?._id?.toString() && (
          <button
            onClick={handleDeletePost}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* CONTENT */}
      <p className="mb-3">{post.content}</p>

      {post.image && (
        <img src={post.image} className="w-full rounded-xl mb-3 border" />
      )}

      {/* LIKE + COMMENTS */}
      <div className="flex items-center gap-3 mb-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg
          ${liked ? "bg-red-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
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
      <div className="flex items-center gap-2 mt-2">
        <input
          type="text"
          value={commentText}
          placeholder="Add a comment..."
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
        />
        <button
          onClick={handleComment}
          className="px-3 py-1 bg-indigo-600 text-white rounded-lg"
        >
          Post
        </button>
      </div>

      {/* COMMENT LIST */}
      <div className="mt-3 space-y-2 max-h-40 overflow-y-auto pr-2">
        {comments.map((c) => {
          
          const canDelete =
            c.user?.toString() === userId ||
            c.user === userId ||
            post.user?._id?.toString() === userId;

          console.log("🟢 Can Delete Comment:", canDelete);

          return (
            <div
              key={c._id}
              className="flex justify-between items-start bg-gray-100 dark:bg-gray-800 p-2 rounded-lg text-sm"
            >
              <div>
                <strong>{c.username}: </strong> {c.text}
              </div>

              {canDelete && (
                <button
                  onClick={() => handleDeleteComment(c._id)}
                  className="text-red-500 hover:text-red-600 ml-3"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PostCard;
