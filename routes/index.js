var express = require('express');
var router = express.Router();

var User = require('../models/user');
var usersController = require('../controllers/users_controller');

/* GET home page. */

router.route('/')
  .get(usersController.index);


router.get('/chat',function(req, res, next){
  res.render('chat', {title: 'Express'});
});

router.get('/code_practice',function(req, res, next){
  res.render('code_practice', {title: 'Express'});
});

router.get('/', ensureAuthenticated, function(req, res, next) {
  res.json({
    user: req.user
  });
});



router.get('/logged_in', ensureAuthenticated, function(req,res,next){
  User.findOne({'githubUsername': req.user.githubUsername}, function(err, user){
    if(err){
      throw err;
    }
    res.render('logged_in', {user: user});
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({
      error: 'please login!'
    });
  }
}


router.get('/login', function(req, res, next){
  res.render('login');
});



router.get('/sign_up', function(req,res,next){
  res.render('sign_up');
});

router.post('/sign_up', function(req,res,next){

  res.json({message: "successfully added new user"});
});



module.exports = router;
