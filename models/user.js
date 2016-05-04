var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  fullName:{type: String },
  githubUsername: {type: String},
  githubProfile: {type: String},
  questions: {type: String},
  interviews: {type: String},
  companiesInterviewsAt: {type: String},
});





var User = mongoose.model('User', userSchema);
module.exports = User;


