var User = require('../models/user');
var users = {};

users.index = function(req,res) {
  User.find({}, function(err, users){
    if(err){
      throw err;
    }
    res.render('index', {title: 'Express', users: users});
  });
};


module.exports = users;
