const Todo = require("../models/todo.model");
const userModel = require("../models/user.model");

// OLD STREAK BASED ON TODOS (keep only if needed)
const getStreak = async (req, res) => {
  const todos = await Todo.find({ userId: req.userId }).sort({ date: 1 });

  let streak = 0;
  let prevDate = null;

  todos.forEach((todo) => {
    if (todo.completed) {
      const currDate = new Date(todo.date).setHours(0, 0, 0, 0);
      if (!prevDate) {
        streak = 1;
      } else if (currDate - prevDate === 86400000) {
        streak++;
      } else if (currDate !== prevDate) {
        streak = 1;
      }
      prevDate = currDate;
    }
  });

  res.status(200).json({ streak });
};


// NEW GLOBAL STREAK HANDLER
const updateStreak = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = user.streak || 0;

 
    if (!user.lastActiveDate) {
      streak = 1;
    } else {
      const last = new Date(user.lastActiveDate);
      last.setHours(0, 0, 0, 0);

      const diff = today - last;

      if (diff === 0) {
        streak = user.streak;
      } else if (diff === 86400000) {
        streak = user.streak + 1;
      } else {
        streak = 1;
      }
    }

    user.streak = streak;
    user.lastActiveDate = today;

    await user.save();

    res.json({ message: "Streak Updated", streak });
  } catch (err) {
    res.status(500).json({ message: "Error updating streak", error: err.message });
  }
};

module.exports = { getStreak, updateStreak };
