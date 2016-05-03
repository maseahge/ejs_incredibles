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


// var userSchema = mongoose.Schema({
//   fb: {
//     id: String,
//     access_token: String,
//     firstName: String,
//     lastName: String,
//     email: String
//   }
// });


var User = mongoose.model('User', userSchema);
module.exports = User;


