const chatModel = require("../models/chat.model");
const messageModel = require("../models/message.model");
const UserModel = require("../models/user.model");
const Habit = require("../models/habit.model");
const HabitLog = require("../models/habitLog.model");
const { generateResponse } = require("../service/ai.service");


async function getOrCreateChat(userId) {
  let chat = await chatModel.findOne({ user: userId });

  if (!chat) {
    chat = await chatModel.create({
      user: userId,
      title: "Habit Buddy Chat"
    });
  }

  return chat;
}

async function getChat(req, res) {
  try {
    const userId = req.user.id;

    const chat = await getOrCreateChat(userId);

    const messages = await messageModel
      .find({ chat: chat._id })
      .sort({ createdAt: 1 });

    res.status(200).json({
      chat,
      messages
    });
  } catch (err) {
    console.error("GET CHAT ERROR:", err);
    res.status(500).json({ error: "Failed to load chat" });
  }
}


async function sendMessage(req, res) {
  try {
    const userId = req.user.id;
    const { content } = req.body;

    const chat = await getOrCreateChat(userId);

    // Save user message
    await messageModel.create({
      user: userId,
      chat: chat._id,
      content,
      role: "user"
    });

    // Fetch real user details
    const fullUser = await UserModel.findById(userId).lean();

    // Fetch habits created by user
    const habits = await Habit.find({ user: userId });

    // Fetch today's log entries
    const today = new Date().toISOString().slice(0, 10);

    const logsToday = await HabitLog.find({
      user: userId,
      date: today
    }).populate("habit");

    const completed = logsToday.filter((l) => l.status).length;
    const missed = logsToday.filter((l) => !l.status).length;

    let habitTitlesText = "";

if (logsToday.length > 0) {
  habitTitlesText = logsToday
    .map(l => `- ${l.habit?.title || "Unknown Habit"} → ${l.status ? "Done" : "Pending"}`)
    .join("\n");
} else {
  habitTitlesText = habits
    .map(h => `- ${h.title} → Not logged today`)
    .join("\n");
}

    const contextText = `
User Summary:
Name: ${fullUser?.name || "User"}

Habit Overview:
Total Habits: ${habits.length}
Completed Today: ${completed}
Missed Today: ${missed}

Habit Titles Today:
${habitTitlesText}

User Stats:
Streak: ${fullUser?.streak || 0}
XP: ${fullUser?.xp || 0}
Goals: ${(fullUser?.goals && fullUser.goals.length > 0) ? fullUser.goals.join(", ") : "No goals set"}
    `;

    // AI conversation input
    const history = [
      { role: "system", parts: [{ text: contextText }] },
      { role: "user", parts: [{ text: content }] }
    ];

    // Generate AI reply
    const aiReply = await generateResponse(history);

    // Save AI message
    await messageModel.create({
      user: userId,
      chat: chat._id,
      content: aiReply,
      role: "model"
    });

    return res.status(200).json({ reply: aiReply });
  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ error: err.message || "AI Error" });
  }
}

async function createNewChat(req,res){
  try{
   const userId = req.user.id;
   const chat = await chatModel.findOne({user : userId});

   if(chat){
    await messageModel.deleteMany({chat : chat._id});
   }else{
    await chatModel.create({
      user:userId,
      title: "Habit Buddy Chat"
    })
   }
   return res.status(200).json({
    message:"New Chat Created"
   })
  }catch (err){
    console.error("CREATE CHAT ERROR:", err);
    res.status(500).json({ error: "Failed to create chat" });
  }
}

module.exports = { getChat, sendMessage , createNewChat};
