const User = require("../models/user.model");
const Post = require("../models/posts.model");

const getLeaderboard = async (req, res) => {
  try {
    const type = req.query.type || "streak";

    if (type === "streak") {
      // ⭐ STREAK LEADERBOARD
      const users = await User.find()
        .sort({ streak: -1 })
        .select("username avatar streak")
        .limit(20);

      return res.json({
        type: "streak",
        leaderboard: users
      });
    }

    if (type === "likes") {
      // ⭐ LIKES LEADERBOARD
      const topCreators = await Post.aggregate([
  {
    $project: {
      user: 1,
      likesCount: { $size: { $ifNull: ["$likes", []] } }
    }
  },
  {
    $group: {
      _id: "$user",
      totalLikes: { $sum: "$likesCount" }
    }
  },
  { $sort: { totalLikes: -1 } },
  { $limit: 20 },
  {
    $lookup: {
      from: "usermodels",
      localField: "_id",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  {
    $project: {
         _id: "$user._id",
      username: "$user.username",
      avatar: "$user.avatar",
      totalLikes: 1
    }
  }
]);


      return res.json({
        type: "likes",
        leaderboard: topCreators
      });
    }

    res.status(400).json({ message: "Invalid leaderboard type" });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getLeaderboard };
