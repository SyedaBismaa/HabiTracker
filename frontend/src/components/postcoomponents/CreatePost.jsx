import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("Image should be less than 2MB");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const submitPost = async () => {
    if (!content.trim()) {
      toast.error("Write something!");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await axios.post(
        "https://habitracker-y4i5.onrender.com/posts/create",
        formData,
        { withCredentials: true }
      );

      toast.success("Post created!");

      setContent("");
      setImage(null);
      setPreview("");

      onPostCreated && onPostCreated();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create post");
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-700 shadow-md p-4 rounded-2xl mb-4 text-white">

      {/* Text input */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share something with everyone..."
        className="w-full h-24 bg-gray-800 text-white 
        rounded-xl p-3 resize-none outline-none 
        focus:ring-2 focus:ring-blue-500"
      />

      {/* Image preview */}
      {preview && (
        <div className="mt-3">
          <img
            src={preview}
            alt="preview"
            className="w-full rounded-xl object-cover border border-gray-700"
          />
        </div>
      )}

      {/* Bottom actions */}
      <div className="mt-3 flex justify-between items-center gap-3 flex-wrap">
        <label className="cursor-pointer bg-gray-800 hover:bg-gray-700
          px-3 py-2 rounded-lg text-gray-200 font-medium">
          Upload Image
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImage}
          />
        </label>

        <button
          onClick={submitPost}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 
          text-white rounded-xl font-semibold transition"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
