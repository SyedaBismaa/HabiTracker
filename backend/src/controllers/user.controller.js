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

module.exports = { updateProfile };
