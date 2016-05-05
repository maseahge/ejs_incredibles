var express = require('express');
var router = express.Router();

var User = require('../models/user');
var usersController = require('../controllers/users_controller');

/* GET home page. */

router.route('/')
  .get(usersController.index);

router.get('/chat',ensureAuthenticated, function(req, res, next){
  res.render('chat', {title: 'Express'});
});

router.get('/about', function(req,res,next){
  res.render('about');
});

router.get('/code_practice',function(req, res, next){
  res.render('code_practice', {title: 'Express'});
});

// router.get('/', ensureAuthenticated, function(req, res, next) {
//   res.json({
//     user: req.user
//   });
// });

router.get('/logged_in', ensureAuthenticated, function(req,res,next){
  User.findOne({'githubUsername': req.user.githubUsername}, function(err, user){
    if(err){
      throw err;
    }
    res.render('logged_in', {user: user});
  });
});

router.get('/login', function(req, res, next){
  res.render('login');
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
}


module.exports = router;
