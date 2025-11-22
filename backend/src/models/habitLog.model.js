const mongoose = require("mongoose");


const  habitLogSchema = new mongoose.Schema({
    //write habit log schema here
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true  
    },
    habit:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Habit',
        required:true
    },
    date:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    }
})


module.exports = mongoose.model("HabitLog", habitLogSchema);