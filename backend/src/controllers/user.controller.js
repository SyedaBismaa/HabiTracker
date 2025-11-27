const { get } = require("mongoose");
const userModel = require("../models/user.model");
const { imagekit } = require("../service/Imagekit.service");

async function updateProfile(req, res) {
  try {
    const userId = req.user.id;

    let avatarUrl = null;

    // Upload avatar if a file is provided
    if (req.file) {
      const uploadResult = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: `avatar_${userId}_${Date.now()}.jpg`,
        folder: "/habitracker/users",
      });

      avatarUrl = uploadResult.url;
    }

    const updatedData = {
      username: req.body.username,
      bio: req.body.bio,
    };

    if (avatarUrl) {
      updatedData.avatar = avatarUrl;
    }

    const updatedUser = await userModel
      .findByIdAndUpdate(userId, updatedData, { new: true })
      .select("-password");

    res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
}

async function getPublicProfile(req, res) {
  try {
    const { username } = req.params;

    const user = await userModel
      .findOne({ username })
      .select("username avatar bio followers following xp posts")
      .populate({
        path: "posts",
        model: "postModel",
        select: "content image likes comments createdAt",
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Profile fetch error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

module.exports = { updateProfile, getPublicProfile };