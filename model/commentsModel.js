const mongoose=require("mongoose");
const {ObjectId}=mongoose.Schema.Types;


const commentsSchema= new mongoose.Schema({
    
     commentBody:String,
     date:{
        type: Date,default: Date.now
     },
     commentedBy:{
        type:ObjectId,
        ref:"User"
     },
     articleName:{
      type:ObjectId,
      ref:"article"
     }

});

const CommentsModel= mongoose.model("comments",commentsSchema);
module.exports=CommentsModel;