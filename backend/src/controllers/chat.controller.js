const chatModel = require('../models/chat.model');
const messageModel = require('../models/message.model');
const { generateResponse } = require('../service/ai.service');
const habitModel = require('../models/habit.model');

// Get or Create Single Chat
async function getOrCreateChat(userId) {
  let chat = await chatModel.findOne({ user: userId });

  if (!chat) {
    chat = await chatModel.create({
      user: userId,        // FIXED → directly passed ID
      title: "Habit Buddy Chat"
    });
  }

  return chat;
}

// Get Chat + Messages
async function getChat(req, res) {
  const userId = req.user.id; // FIXED

  const chat = await getOrCreateChat(userId);

  const messages = await messageModel.find({ chat: chat._id }).sort({ createdAt: 1 });

  res.status(200).json({
    chat,
    messages
  });
}

// Send Message → AI Responds
async function sendMessage(req, res) {
  try {
    const userId = req.user.id; // FIXED
    const { content } = req.body;

    const chat = await getOrCreateChat(userId);

    // Save user message
    await messageModel.create({
      user: userId,
      chat: chat._id,
      content,
      role: "user"
    });

    // Habit Context
    const habitsToday = await habitModel.find({
      user: userId,
      date: new Date().toISOString().slice(0, 10)
    });

    const contextText = `
User Habit Summary:
Goals: ${req.user.goals || "No goals set"}
Current Streak: ${req.user.streak || 0}
XP: ${req.user.xp || 0}
Completed Today: ${habitsToday.filter(h => h.completed).length}
Missed Today: ${habitsToday.filter(h => !h.completed).length}
`;

    const history = [
      { role: "system", parts: [{ text: contextText }] },
      { role: "user", parts: [{ text: content }] }
    ];

    const aiReply = await generateResponse(history);

    await messageModel.create({
      user: userId,
      chat: chat._id,
      content: aiReply,
      role: "model"
    });

    res.status(200).json({
      reply: aiReply
    });

  } catch (err) {
     console.error("AI ERROR:", err);
    res.status(500).json({ error: err.message || "AI Error" });
  }
}

module.exports = { getChat, sendMessage };
