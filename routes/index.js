// routes/index.js
const express = require('express');
const router = express.Router();
var userModel = require('./users')
var passport = require('passport')
const upload = require('./multer');
// const location=require('./latituse')

var localStrategy = require('passport-local')
passport.use(new localStrategy(userModel.authenticate()))
// const upload = require('./multer')
// const videoModel = require('./video')
const fs = require('fs')
// GET /
router.get('/', (req, res) => {
    res.render('index'); // Render index.ejs
});
router.get('/login', (req, res) => {
    res.render('login'); // Render index.ejs
});
router.get('/register', (req, res) => {
    res.render('register'); // Render index.ejs
});
router.get('/home',isloggedIn, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
    res.render('home',{user}); // Render index.ejs
});

// POST /tracking/search
/* **************** user authentication routes ********************* */

router.post('/register', upload.single('image'), function (req, res) {
  if (!req.file) {
      return res.status(400).send('No file uploaded.');
  }

  var userData = new userModel({
      username: req.body.username,
      image: req.file.filename
  });

  userModel.register(userData, req.body.password)
      .then(function (registeredUser) {
          passport.authenticate('local')(req, res, function () {
              res.redirect('/home');
          });
      })
      .catch(function (err) {
          res.status(500).send('Error registering user: ' + err.message);
      });
});

  router.post('/login',
    passport.authenticate('local', {
      successRedirect: '/home',
      failureRedirect: '/login',
    }),
    (req, res, next) => { }
  );
  
  router.get('/logout', (req, res, next) => {
    if (req.isAuthenticated())
      req.logout((err) => {
        if (err) res.send(err);
        else res.redirect('/');
      });
    else {
      res.redirect('/');
    }
  });
  
  function isloggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    else res.redirect('/login');
  }
  
  /* **************** user authentication routes ********************* */
  
  router.get("/lon",isloggedIn,function(req,res){
    res.render("lon")

  })
  router.get('/lan',isloggedIn, async function(req,res){
   
    res.render("lon")
  })


module.exports = router;
