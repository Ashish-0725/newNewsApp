const passport=require("passport")
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var findOrCreate = require('mongoose-findorcreate');
const UserModel=require("../model/userModel.js");
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/admin/auth/google/dashboard",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    UserModel.findOrCreate({ googleId: profile.id,firstName:profile.name.givenName,lastName:profile.name.familyName,username:profile.emails[0].value }, function (err, user) {
        console.log(profile.emails[0].value);
      return cb(err, user);
    });
  }
));