const mongoose=require("mongoose");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
var findOrCreate = require('mongoose-findorcreate');

const {Schema}=mongoose;
const UserSchema=new Schema({
  firstName:String,
  lastName:String,
  username:String,
  password:String,
  googleId:String
});

//virtuals
UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
}) ;


UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

const UserModel=mongoose.model("User",UserSchema);
passport.use(UserModel.createStrategy());
// passport.serializeUser(UserModel.serializeUser());
// passport.deserializeUser(UserModel.deserializeUser());

passport.serializeUser(function(user, done){

  done(null, user.id);

});



passport.deserializeUser(function(id, done){

  UserModel.findById(id, function(err, user){

    done(err, user);

  });

});

module.exports=UserModel;
