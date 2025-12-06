const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../service/googleAuth"); // Load strategy

const jwt = require("jsonwebtoken");

const { 
  registerUser, 
  loginUser, 
  getUser,
  logoutUser,
  getUserMe
} = require("../controllers/auth.controller");

const authMiddleware = require("../middlewares/auth.middlewares");

// -----------------------------------------
// 🔹 LOCAL AUTH ROUTES
// -----------------------------------------

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", getUser);     // old cookie-based
router.get("/me", authMiddleware, getUserMe);  // new protected
router.post("/logout", logoutUser);

// -----------------------------------------
// ⭐ GOOGLE AUTH ROUTES — MUST BE HERE
// -----------------------------------------

// Step 1 → Redirect user to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Step 2 → Google redirects back
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {

    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Set JWT cookie so your middleware works
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production
    });

    // Redirect front-end without token in URL
    res.redirect("http://localhost:5173/oauth-success");
  }
);

module.exports = router;
