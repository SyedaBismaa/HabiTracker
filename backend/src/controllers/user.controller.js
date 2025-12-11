const { get } = require("mongoose");
const userModel = require("../models/user.model");
const { imagekit, uploadFile } = require("../service/Imagekit.service");


async function updateProfile(req, res) {
  try {
    const userId = req.user.id;

    let avatarUrl = null;

    if (req.files && req.files.avatar) {
      const file = req.files.avatar;
      const base64 = file.data.toString("base64");

      const uploaded = await uploadFile(
        base64,
        `avatar_${userId}_${Date.now()}.jpg`,
        "/habitracker/users"
      );

      avatarUrl = uploaded.url;
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

    return res.json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("💥 UPDATE PROFILE ERROR:", error);
    return res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
}

async function getPublicProfile(req, res) {
  try {
    const { username } = req.params;

    const user = await userModel
      .findOne({ username })
      .select("username avatar bio followers following xp posts streak")
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

async function followUser(req, res) {
  try {
    const followerId = req.user.id; // logged in user
    const { username } = req.params;

    const targetUser = await userModel.findOne({ username });

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cannot follow yourself
    if (targetUser._id.toString() === followerId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    // Already following?
    if (targetUser.followers.includes(followerId)) {
      return res.status(400).json({ message: "Already following" });
    }

    // Add follower
    targetUser.followers.push(followerId);

    // Add following to current user
    await userModel.findByIdAndUpdate(followerId, {
      $push: { following: targetUser._id }
    });

    await targetUser.save();

    res.json({ message: "Followed successfully" });

  } catch (error) {
    console.error("Follow Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
async function unfollowUser(req, res) {
  try {
    const followerId = req.user.id;
    const { username } = req.params;

    const targetUser = await userModel.findOne({ username });

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!targetUser.followers.includes(followerId)) {
      return res.status(400).json({ message: "You are not following this user" });
    }

    // Remove from followers
    targetUser.followers.pull(followerId);

    // Remove from following
    await userModel.findByIdAndUpdate(followerId, {
      $pull: { following: targetUser._id }
    });

    await targetUser.save();

    res.json({ message: "Unfollowed successfully" });

  } catch (error) {
    console.error("Unfollow Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
async function checkFollowStatus(req, res) {
  try {
    const currentUserId = req.user.id;
    const { username } = req.params;

    const targetUser = await userModel.findOne({ username });

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const following = targetUser.followers.includes(currentUserId);

    res.json({ following });

  } catch (error) {
    console.error("Check Follow Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
}
async function getFollowersList(req, res) {
  try {
    const { username } = req.params;

    const user = await userModel.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const followers = await userModel
      .find({ _id: { $in: user.followers } })
      .select("username avatar bio");

    res.json({ followers });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

// Following list
async function getFollowingList(req, res) {
  try {
    const { username } = req.params;

    const user = await userModel.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const following = await userModel
      .find({ _id: { $in: user.following } })
      .select("username avatar bio");

    res.json({ following });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
 updateProfile,
  getPublicProfile,
  followUser,
  unfollowUser,
  checkFollowStatus,
  getFollowersList,
  getFollowingList
  };