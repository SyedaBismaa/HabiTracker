const Todo = require("../models/todo.model")

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

module.exports = { getStreak }; // ✅ named export
