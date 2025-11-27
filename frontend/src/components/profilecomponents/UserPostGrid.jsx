import React from "react";
import PostCardMini from "./PostCardMini";

const UserPostsGrid = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-6">
        No posts yet
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 w-full max-w-3xl">
      {posts.map((post) => (
        <PostCardMini key={post._id} post={post} />
      ))}
    </div>
  );
};

export default UserPostsGrid;
