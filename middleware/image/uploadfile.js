const multer=require("multer");


const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,public/uploadFolder);
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+file.originalname);
  }
})
const upload=multer({storage:storage});

const function uploadFunction(req,res,next){
upload.single("image");
next();

}
module.exports.uploadFunction=uploadFunction;
