const mongoose=require('mongoose')
const noteSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    tag:{
        type:String,
        default:Date.now
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const Notes=mongoose.model('Notes',noteSchema)
module.exports=Notes