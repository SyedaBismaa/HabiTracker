const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middlewares");

const { getLeaderboard } = require("../controllers/leaderboard.controller");

// GET /leaderboard?type=streak
// GET /leaderboard?type=likes
router.get("/", auth, getLeaderboard);

module.exports = router;
