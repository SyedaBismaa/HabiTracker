import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const submitPost = async () => {
    if (!content.trim()) return alert("Write something!");

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      const res = await axios.post("http://localhost:3000/posts/create", formData, {
        withCredentials: true,
        
      });
      toast.success("Post created!");

      setContent("");
      setImage(null);
      setPreview("");

      if (onPostCreated) onPostCreated();
    } catch (error) {
      console.log(error);
      alert("Failed to create post");
    }
  };

  return (
    <div className="bg-white  dark:bg-gray-900 shadow-md p-4 rounded-2xl mb-4 border border-gray-200 dark:border-gray-700">
      
      {/* Input text */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share something with everyone..."
        className="w-full h-24 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white 
        rounded-xl p-3 resize-none outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Image preview */}
      {preview && (
        <div className="mt-3">
          <img
            src={preview}
            alt="preview"
            className="w-full rounded-xl object-cover border border-gray-300"
          />
        </div>
      )}

      {/* Bottom row */}
      <div className="mt-3 flex justify-between items-center">
        <label className="cursor-pointer bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600
        px-3 py-2 rounded-lg text-gray-800 dark:text-gray-200 font-medium">
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
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
