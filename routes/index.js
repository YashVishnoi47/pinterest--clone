var express = require('express');
const passport = require('passport');
var router = express.Router();
const localStrategy = require("passport-local");
const app = express();
userModel = require("./users")
postModel = require("./post")
passport.use(new localStrategy(userModel.authenticate()));
const upload = require('./multer');
const post = require('./post');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/profile', isLoggedIn, async function(req, res, next) {
  const user = 
  await userModel
          .findOne({ username: req.session.passport.user })
          .populate("posts")
  res.render('profile', {
    isLoggedIn: req.isAuthenticated(),
    user: user
  });
});





router.get('/feed', isLoggedIn, async function(req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user })
  const posts = await postModel.find().populate("user")
  
  res.render('feed', {
    posts,
    isLoggedIn: req.isAuthenticated(),
    user: user,
    
  });
});





router.get('/show/posts', isLoggedIn, async function(req, res, next) {
  const user = 
  await userModel
          .findOne({ username: req.session.passport.user })
          .populate("posts")
  res.render('show', {
    isLoggedIn: req.isAuthenticated(),
    user: user
  });
});








router.get('/add', isLoggedIn, async function(req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.render('add', {
    isLoggedIn: req.isAuthenticated(),
    user: user
  });
});


router.post('/createpost', isLoggedIn, upload.single("postimg"),async function(req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const post = await postModel.create({
    user:user._id,
    title:req.body.title,
    image:req.file.filename
  });

  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});


router.get('/register', function(req, res, next) {
  res.render('index');
});


router.post('/register', function(req, res, next) {
  var userdata =  new userModel({
    username:req.body.username,
    email:req.body.email
  });


  userModel.register(userdata, req.body.password)
  .then(function(registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect('/profile')
    })
  });
});



router.post("/login",passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/",
  failureFlash: true
}),function(req,res){ }); 






router.get('/logout',function(req,res,next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});




function isLoggedIn(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect("/");  
};


router.post('/fileupload',isLoggedIn,upload.single('image'),async (req,res)=>{
  if(!req.file){
    return res.status(400).send('No files were Uploaded')
  }
  const user = await userModel.findOne({username:req.session.passport.user})
  user.profileimage = req.file.filename;
  await user.save();
  res.redirect("/profile");
})







module.exports = router;
