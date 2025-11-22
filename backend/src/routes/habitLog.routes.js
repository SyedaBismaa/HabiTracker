const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middlewares");

const {
    toggleHabitStatus,
    getLogsByMonth,
    getLogsForHabit
} = require("../controllers/habitLog.controller");


// Toggle checkbox
router.post("/toggle", authMiddleware, toggleHabitStatus);

// Get logs for full month
// Example: /habits/logs?month=11&year=2025
router.get("/logs", authMiddleware, getLogsByMonth);

// Get logs for one habit (chart, streak etc.)
router.get("/:habitId", authMiddleware, getLogsForHabit);


module.exports = router;
