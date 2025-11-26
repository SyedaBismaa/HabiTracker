const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middlewares");
const upload = require("../middlewares/multer");

const {
  createPost,
  likePost,
  getAllPosts,
  getUserPosts,
  deletePost,
  deleteComment,
  addComment
} = require("../controllers/posts.controller");

router.post("/create", auth, upload.single("image"), createPost);

router.put("/like/:id", auth, likePost);

router.get("/", auth, getAllPosts);

router.get("/user/:id", auth, getUserPosts);
router.post("/comment/:id", auth, addComment);

router.delete("/delete/:id", auth, deletePost);
router.delete("/comment/:id/:commentId", auth, deleteComment);


module.exports = router;
