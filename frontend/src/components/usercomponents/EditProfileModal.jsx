import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const EditProfileModal = ({ isOpen, onClose, user, onUpdate }) => {
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio || "");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);

  if (!isOpen) return null;

  const handleAvatarSelect = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {


    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("bio", bio);
      if (avatar) formData.append("avatar", avatar);

      const res = await axios.put(
        "http://localhost:3000/users/update-profile",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      toast.success("Profile updated!");
      onUpdate(res.data.user);
      onClose();

    } catch (error) {
      console.error("❌ UPDATE ERROR:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-2xl w-full max-w-md relative text-white">

        <button onClick={onClose} className="absolute top-3 right-3">
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        <img src={avatarPreview} className="w-28 h-28 rounded-full mx-auto mb-4" />

        <input type="file" onChange={handleAvatarSelect} className="mb-4" />

        <input
          type="text"
          className="w-full mb-3 p-2 bg-gray-700 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <textarea
          className="w-full p-2 bg-gray-700 rounded"
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <button
          onClick={handleUpdate}
          className="mt-4 w-full bg-indigo-600 py-2 rounded-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfileModal;
