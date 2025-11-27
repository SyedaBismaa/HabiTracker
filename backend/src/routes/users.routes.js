const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");
const auth = require("../middlewares/auth.middlewares");
const { imagekit } = require("../service/Imagekit.service");
const { updateProfile , getPublicProfile } = require("../controllers/user.controller");


// Profile Update API
router.put("/update-profile", auth, upload.single("avatar"), updateProfile);
router.get("/profile/:username", getPublicProfile);


module.exports = router;
