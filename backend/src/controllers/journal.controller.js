const Journal = require("../models/journal.model");

// Create Journal
async function createJournal(req, res) {
  try {
    const { title, content, images } = req.body;

    const journal = await Journal.create({
      userId: req.userId,
      title,
      content,
      images: images || [],
    });

    res.status(201).json({
      message: "Journal created successfully",
      journal,
    });
  } catch (err) {
    res.status(500).json({ message: "Error creating journal", error: err.message });
  }
}

// Get all journals of logged-in user
async function getJournals(req, res) {
  try {
    const journals = await Journal.find({ userId: req.userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Journals fetched successfully",
      journals,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching journals", error: err.message });
  }
}

// Update journal
async function updateJournal(req, res) {
  try {
    const { title, content, images } = req.body;

    const journal = await Journal.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!journal) {
      return res.status(404).json({ message: "Journal not found or unauthorized" });
    }

    if (title) journal.title = title;
    if (content) journal.content = content;
    if (images) journal.images = images;

    journal.updatedAt = Date.now();

    await journal.save();

    res.status(200).json({
      message: "Journal updated successfully",
      journal,
    });
  } catch (err) {
    res.status(500).json({ message: "Error updating journal", error: err.message });
  }
}

// Delete journal
async function deleteJournal(req, res) {
  try {
    const journal = await Journal.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!journal) {
      return res.status(404).json({ message: "Journal not found or unauthorized" });
    }

    res.status(200).json({
      message: "Journal deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Error deleting journal", error: err.message });
  }
}

module.exports = {
  createJournal,
  getJournals,
  updateJournal,
  deleteJournal,
};
