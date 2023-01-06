const passport=require("passport");
require("../../node_modules/passport")
const CheckAuthentication=function(req,res,next){
  if(req.isAuthenticated()){
    next();
  }else{
    console.log("cannot login");
    res.redirect("/admin/login");
  }
}
module.exports=CheckAuthentication;
