const mongoose = require("mongoose")

const Todoschema = new mongoose.Schema({
    //write todo and callender login here 
    userId:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"User",
        required:true
    },
    task:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Todo",Todoschema)