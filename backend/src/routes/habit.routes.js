const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middlewares");

const {
    createHabit,
    updateHabit,
    getHabit,
    deleteHabit
} = require("../controllers/habit.controller");


// Create habit
router.post("/", authMiddleware, createHabit);

// Get all habits for the logged-in user
router.get("/", authMiddleware, getHabit);

// Update habit
router.patch("/:id", authMiddleware, updateHabit);

// Delete habit
router.delete("/:id", authMiddleware, deleteHabit);


module.exports = router;
