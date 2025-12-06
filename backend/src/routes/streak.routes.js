const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middlewares");

const { getStreak, updateStreak } = require("../controllers/streak.controller");

router.get("/", authMiddleware, getStreak);

router.post("/update", authMiddleware, updateStreak);

module.exports = router;
