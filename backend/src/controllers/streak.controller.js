const userModel = require("../models/user.model");

// ---------- UPDATE STREAK ----------
const updateStreak = async (req, res) => {
  try {
    const userId = req.userId; 
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Normalize today to UTC midnight
    const now = new Date();
    const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    let streak = user.streak || 0;

    if (!user.lastActiveDate) {
      // First time
      streak = 1;
    } else {
      const last = new Date(user.lastActiveDate);
      const normalizedLast = new Date(Date.UTC(last.getUTCFullYear(), last.getUTCMonth(), last.getUTCDate()));

      const diff = today - normalizedLast;
      const ONE_DAY = 86400000;

      if (diff === 0) {
        // Same day → do nothing
        streak = user.streak;
      } else if (diff === ONE_DAY) {
        // Consecutive day → increase streak
        streak = (user.streak || 0) + 1;
      } else {
        // Missed → reset
        streak = 1;
      }
    }

    user.streak = streak;
    user.lastActiveDate = today;
    await user.save();

    return res.json({ message: "Streak updated", streak });
  } catch (err) {
    return res.status(500).json({ message: "Error updating streak", error: err.message });
  }
};

// ---------- GET CURRENT STREAK ----------
const getStreak = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      streak: user.streak || 0,
      lastActiveDate: user.lastActiveDate
    });
  } catch (err) {
    return res.status(500).json({ message: "Error fetching streak", error: err.message });
  }
};

module.exports = { updateStreak, getStreak };
