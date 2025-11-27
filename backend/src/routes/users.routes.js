const express = require("express");
const router = express.Router();

const upload = require("../middlewares/multer");
const auth = require("../middlewares/auth.middlewares");
const { imagekit } = require("../service/Imagekit.service");
const { updateProfile ,
   getPublicProfile , 
   followUser,
   unfollowUser,
   checkFollowStatus } = require("../controllers/user.controller");


// Profile Update API
router.put("/update-profile", auth, upload.single("avatar"), updateProfile);
router.get("/profile/:username", getPublicProfile);
router.post("/follow/:username", auth, followUser);
router.post("/unfollow/:username", auth, unfollowUser);
router.get("/check-follow/:username", auth, checkFollowStatus);



module.exports = router;
