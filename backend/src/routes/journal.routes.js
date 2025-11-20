const express = require("express");
const router = express.Router();

const journalController = require("../controllers/journal.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

router.post("/", authMiddleware, journalController.createJournal);
router.get("/", authMiddleware, journalController.getJournals);
router.put("/:id", authMiddleware, journalController.updateJournal);
router.delete("/:id", authMiddleware, journalController.deleteJournal);

module.exports = router;
