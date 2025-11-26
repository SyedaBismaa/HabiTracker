import React from "react";

const Avatar = ({ src, size = "w-24 h-24" }) => {
  return (
    <div className={`relative ${size}`}>
      <img
        src={src || "https://via.placeholder.com/150"}
        className="rounded-full object-cover w-full h-full border-4 border-indigo-500 shadow-lg"
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
