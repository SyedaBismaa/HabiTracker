const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../service/googleAuth");

const jwt = require("jsonwebtoken");

const {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
  getUserMe,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middlewares/auth.middlewares");

// -----------------------------------------
// 🔹 LOCAL AUTH ROUTES
// -----------------------------------------
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", getUser);
router.get("/me", authMiddleware, getUserMe);
router.post("/logout", logoutUser);

// -----------------------------------------
// ⭐ GOOGLE AUTH ROUTES (FINAL)
// -----------------------------------------

// STEP 1: Start Google OAuth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// STEP 2: Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  (req, res) => {
    try {
      // Create JWT
      const token = jwt.sign(
        { id: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      // 🔥 IMPORTANT: Cross-site cookie settings
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,        // REQUIRED on Render (HTTPS)
        sameSite: "none",    // REQUIRED for OAuth
      });

      // 🔥 Redirect to frontend success page
      res.redirect(`${process.env.FRONTEND_URL}/oauth-success`);
    } catch (err) {
      console.error("Google callback error:", err);
      res.redirect(`${process.env.FRONTEND_URL}/login`);
    }
  }
);

module.exports = router;
