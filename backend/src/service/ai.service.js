// src/service/ai.service.js
const OpenAI = require("openai");

// Initialize OpenAI Client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Convert Gemini-style "history" into OpenAI messages format.
 * Your history looks like:
 * [
 *   { role: "system", parts: [{ text: "..." }] },
 *   { role: "user", parts: [{ text: "..." }] }
 * ]
 *
 * This function converts it to:
 * [
 *   { role: "system", content: "..." },
 *   { role: "user", content: "..." }
 * ]
 */
function convertHistoryToMessages(history) {
  if (!Array.isArray(history)) return [];

  return history.map(entry => {
    let content = "";

    if (entry?.parts && entry.parts[0]?.text) {
      content = entry.parts[0].text;
    } else if (entry?.text) {
      content = entry.text;
    }

    // Normalize role for OpenAI
    let role = entry.role;
    if (role === "model") role = "assistant";
    if (!["system", "user", "assistant"].includes(role)) {
      role = "user";
    }

    return {
      role,
      content: String(content || "")
    };
  });
}

async function generateResponse(history) {
  try {
    const messages = convertHistoryToMessages(history);

    // Ensure persona system prompt is always injected at top if missing
    const personaPrompt = `
You are HabitBuddy 🧠 — a personal habit coach inside the Habitracker app, created by Syeda Bismah.

Your vibe:
- Friendly, simple, warm, motivating.
- Give short, actionable advice.
- No long lectures, no cringe motivation.
- Use Hinglish/English depending on the user message.
- Adapt your tone to user's energy.
- Don’t repeat your identity unless asked.

Your job:
- Help user build consistent habits.
- Suggest practical steps.
- Analyse streak, XP, goals (provided in system context).
- Encourage without pressure.
`;

    // Inject persona if system prompt missing
    const hasSystem = messages.some(m => m.role === "system");
    if (!hasSystem) {
      messages.unshift({
        role: "system",
        content: personaPrompt
      });
    } else {
      // append persona to existing system prompt
      messages[0].content =
        messages[0].content + "\n\n" + personaPrompt;
    }

    // Call OpenAI
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.7,
      max_tokens: 500
    });

    const text = completion?.choices?.[0]?.message?.content;

    if (!text) throw new Error("Empty response from AI");

    return text;

  } catch (err) {
    console.error("OpenAI ERROR:", err);
    throw err;
  }
}

module.exports = { generateResponse };
