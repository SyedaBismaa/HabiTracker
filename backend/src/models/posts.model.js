const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
    required: true
  },

  content: {
    type: String,
    required: true
  },

  image: {
    type: String,
    default: null
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel"
    }
  ],
  comments: [
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
    username: String,
    text: String,
    createdAt: { type: Date, default: Date.now }
  }
],


  createdAt: {
    type: Date,
    default: Date.now
  }
});

const postModel = mongoose.model("postModel", postSchema);

module.exports = postModel;
