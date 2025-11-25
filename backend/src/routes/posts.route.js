const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middlewares");
const upload = require("../middlewares/multer");

const {
  createPost,
  likePost,
  getAllPosts,
  getUserPosts
} = require("../controllers/posts.controller");

// Create post
router.post("/create", auth, upload.single("image"), createPost);

// Like/unlike
router.put("/like/:id", auth, likePost);

// All posts
router.get("/", auth, getAllPosts);

// User posts
router.get("/user/:id", auth, getUserPosts);

module.exports = router;
