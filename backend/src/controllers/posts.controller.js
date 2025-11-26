const postModel = require("../models/posts.model");
const userModel = require("../models/user.model");
const { imagekit } = require("../service/Imagekit.service");

async function createPost(req, res) {
  try {
    const userId = req.user.id;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    let imageUrl = null;

    // Upload image to ImageKit if provided
    if (req.file) {
      const uploaded = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: `post_${userId}_${Date.now()}.jpg`,
        folder: "/habitracker/posts"
      });

      imageUrl = uploaded.url;
    }

    const newPost = await postModel.create({
      user: userId,
      content,
      image: imageUrl
    });

    // Add XP (+5)
    await userModel.findByIdAndUpdate(userId, { $inc: { xp: 5 } });

    return res.status(201).json({
      message: "Post Created",
      post: newPost
    });

  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
}


async function likePost(req,res){
    // Like or unlike a post
    try{
        const postId = req.params.id;
        const userId= req.user.id;

        const post = await postModel.findById(postId);
        if(!post) return res.status(404).json({
            message:"Posts Not Found"
        });

        const alreadyLiked = post.likes.includes(userId);

        if(alreadyLiked){
            post.likes.pull(userId);
            await userModel.findByIdAndUpdate(post.user,{$inc:{xp:-1}});

            await post.save();
            return res.json({message:"Post unliked",post});
        }

        post.likes.push(userId);
        await userModel.findByIdAndUpdate(post.user,{$inc:{xp:1}});

        await post.save();
        return res.json({message:"Post liked",post});
    }catch(err){
        res.status(500).json({message:"Server Error", error:err.message});
    }
}



async function getAllPosts(req, res) {
  try {
    const posts = await postModel
      .find()
      .populate("user", "username avatar")
      .sort({ likes: -1 }); // descending

    res.json({ posts });

  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
}


async function getUserPosts(req, res) {
  try {
    const userId = req.params.id;

    const posts = await postModel
      .find({ user: userId })
      .sort({ createdAt: -1 });

    res.json({ posts });

  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
}


async function deletePost(req, res) {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    // Find post
    const post = await postModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Only author can delete
    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this post" });
    }

    // Delete post
    await postModel.findByIdAndDelete(postId);

    return res.json({ message: "Post deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function addComment(req, res) {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({
      user: req.user.id,
      username: req.user.username,
      text: req.body.text,
    });

    await post.save();

    res.json({ message: "Comment added", post });

  } catch (err) {
    res.status(500).json({ message: "Error", error: err.message });
  }
}
async function deleteComment(req, res) {
  try {
    const { id, commentId } = req.params; // postId + commentId
    const userId = req.user.id;

    const post = await postModel.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Find the comment
    const commentIndex = post.comments.findIndex(
      (c) => c._id.toString() === commentId
    );

    if (commentIndex === -1)
      return res.status(404).json({ message: "Comment not found" });

    const comment = post.comments[commentIndex];

    // Allow delete ONLY if:
    // 1️⃣ Comment owner OR 2️⃣ Post owner
    if (
      comment.user.toString() !== userId &&
      post.user.toString() !== userId
    ) {
      return res.status(403).json({ message: "Not allowed to delete comment" });
    }

    // Remove the comment correctly
    post.comments.splice(commentIndex, 1);

    await post.save();

    res.json({ message: "Comment deleted", post });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting comment",
      error: error.message,
    });
  }
}



module.exports = {
    createPost,
    likePost,
    getAllPosts,
    getUserPosts,
    deletePost,
    addComment,
     deleteComment
};