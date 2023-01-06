require("dotenv").config();
const express=require("express");
const mongoose=require("mongoose");
const app=express();
const session=require("express-session");
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine","ejs");
const path=require("path");
app.set("views",path.join(__dirname,"/views/admin/"));

app.use(session({
  secret:"MyObject",
  resave:false,
  saveUninitialized:false,
  cookie:{maxAge:1000*60*60*24}
}));
app.use(passport.initialize());
app.use(passport.session());

const adminRoute=require("./routes/admin/routes.js");
app.use("/admin",adminRoute);


mongoose.connect("mongodb://localhost:27017/newBBC",{useNewUrlParser:true,family:4},function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Connected to DB");
  }
})

app.get("/",function(req,res){
  res.send("Home route");
});

app.listen("3000",function(){
  console.log("server running at port 3000");
})
