const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:false
    },
    bio:{
        type:String,
        required:false
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    xp:{
        type:Number,
        default:0
    },
    posts: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
],
lastActiveDate: {
     type: Date,
      default: null
     },
streak: {
     type: Number, 
     default: 0 
    },

})

const userModel = mongoose.model("userModel",userSchema);

module.exports=userModel;