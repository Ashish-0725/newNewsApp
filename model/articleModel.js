const mongoose = require("mongoose");

const {
  Schema
} = mongoose;

const {
  ObjectId
} = mongoose.Schema.Types;

const articleSchema = new Schema({
  title: String,

  content: String,

  image: String,
  
  comments:{
    type:ObjectId,
    ref:"comments"
  },

  date: {
    type: Date,
    default: Date.now
  },

  postedBy: {
    type: ObjectId,
    ref: "User"
  }
});

articleSchema.virtual('fullNameOfCommentUser', {
    ref: 'User',
    localField: 'postedBy', // Of post collection
    foreignField: '_id',    // Of user collection
    justOne: true
})


const ArticleModel = mongoose.model("article", articleSchema);
module.exports = ArticleModel;
