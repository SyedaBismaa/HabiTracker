const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth.controller")

// REGISTER API
router.post("/register", authcontroller.registerUser);

// LOGIN API
router.post("/login", authcontroller.loginUser )

// GET USER API
router.get("/user", authcontroller.getUser);

// LOGOUT API
router.post("/logout", authcontroller.logoutUser);


module.exports = router;
