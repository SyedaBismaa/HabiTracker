const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middlewares")
const { getStreak } = require("../controllers/streak.controller");

router.get("/", authMiddleware, getStreak);

module.exports = router;
