const express=require("express");
const router=express.Router();
const multer=require("multer");
const passport=require("passport")
// const Upload=require("../middleware/image/uploadfile");
const CheckAuthentication=require("../../middleware/validations/Authentication");
require("../../middleware/googleOauth")

const AdminController=require("../../controller/adminController");
const UserController=require("../../controller/userController");
const ArticleController=require("../../controller/articleController");

router.get("/dashboard",CheckAuthentication,AdminController.dashboard);
router.get("/login",AdminController.login);
router.post("/login",AdminController.postLogin);

router.get("/dashboard/register",CheckAuthentication,UserController.register);
router.post("/dashboard/register",CheckAuthentication,UserController.registerNew);
router.get("/dashboard/viewUsers",CheckAuthentication,UserController.viewUsers);
router.get("/dashboard/viewUsers/editUser/:userId",CheckAuthentication,UserController.editUser);
router.post("/dashboard/viewUsers/editUser/:userId",CheckAuthentication,UserController.editThisUser);
router.get("/dashboard/viewUsers/deleteUser/:userId",CheckAuthentication,UserController.deleteUser);


router.get("/dashboard/addArticle",CheckAuthentication,ArticleController.addArticle);

const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"public/uploadFolder");
  },
  filename:function(req,file,cb){
    cb(null,Date.now()+file.originalname);
  }
})
const upload=multer({storage:storage});

router.post("/dashboard/addArticle",upload.single("image"),CheckAuthentication,ArticleController.addNewArticle);
router.get("/dashboard/viewArticles",CheckAuthentication,ArticleController.viewArticles);
router.get("/dashboard/viewArticles/:articleId",CheckAuthentication,ArticleController.viewThisArticle);
// router.get("/dashboard/viewArticles/:articleId",CheckAuthentication,ArticleController.showComment);
router.post("/dashboard/viewArticles/viewThisArticle/add/:articleId",CheckAuthentication,ArticleController.addcomment);
router.get("/dashboard/viewArticles/viewThisArticle/get/:articleId",CheckAuthentication,ArticleController.getComments);
// router.post("/dashboard/viewArticles/:commentId/edit",CheckAuthentication,ArticleController.editComment);
router.post("/dashboard/viewArticles/:articleId/delete/:commentId",CheckAuthentication,ArticleController.deleteComment);

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/auth/google/dashboard', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/admin/dashboard');
  });

module.exports=router;
