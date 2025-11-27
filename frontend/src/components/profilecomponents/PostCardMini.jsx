import React from "react";

const PostCardMini = ({ post }) => {
  return (
    <div
      className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:bg-gray-850 
      hover:shadow-lg transition cursor-pointer p-0"
    >
      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="w-full h-48 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-4">

        {/* Text preview (2-3 lines max) */}
        {post.content && (
          <p className="text-gray-300 text-sm line-clamp-3">
            {post.content}
          </p>
        )}

        {/* Metadata */}
        <div className="mt-3 flex justify-between text-xs text-gray-500">
          <span>❤️ {post.likes?.length || 0}</span>
          <span>
            {new Date(post.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCardMini;
