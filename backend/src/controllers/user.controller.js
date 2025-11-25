

async function updateProfile(req, res) {
  try {
    const userId = req.user.id;

    // Find current user
    const user = await userModel.findById(userId);

    let avatarUrl = user.avatar; // Keep the old avatar by default

    // If avatar file is uploaded → replace it
    if (req.file) {
      const upload = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: `avatar_${userId}_${Date.now()}.jpg`,
        folder: "/habitracker/users"
      });

      avatarUrl = upload.url; // Replace old avatar
    }

    // Update profile fields
    user.avatar = avatarUrl;
    user.bio = req.body.bio ?? user.bio;

    await user.save();

    return res.json({
      message: "Profile Updated",
      user
    });

  } catch (error) {
    return res.status(500).json({ message: "Error", error: error.message });
  }
}


module.exports = {
  updateProfile
}