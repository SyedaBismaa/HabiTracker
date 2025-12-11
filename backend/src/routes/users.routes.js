const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const auth = require("../middlewares/auth.middlewares");

const {
  updateProfile,
  getPublicProfile,
  followUser,
  unfollowUser,
  getFollowersList,
  getFollowingList,
  checkFollowStatus
} = require("../controllers/user.controller");

// ⭐ Enable express-fileupload for this router
router.use(fileUpload());

// ⭐ Profile Update Route (NO MULTER)
router.put("/update-profile", auth, updateProfile);

router.get("/profile/:username", getPublicProfile);
router.post("/follow/:username", auth, followUser);
router.post("/unfollow/:username", auth, unfollowUser);
router.get("/check-follow/:username", auth, checkFollowStatus);
router.get("/followers/:username", getFollowersList);
router.get("/following/:username", getFollowingList);

module.exports = router;
