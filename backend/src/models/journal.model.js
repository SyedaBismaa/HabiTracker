//jornals structure 

const mongoose = require('mongoose');

const jornalSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    images:[
        {
            type:String, //optional
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    }
});


module.exports = mongoose.model("Journal", jornalSchema);