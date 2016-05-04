var bcrypt   = require('bcrypt-nodejs');
var mongoose = require('mongoose')
	,Schema = mongoose.Schema

var userSchema = Schema({
  fullName:{type: String },
  githubUsername: {type: String},
  githubProfile: {type: String},
  questions: {type: String},
  interviews: {type: String},
  companiesInterviewsAt: {type: String},
  post: [{type: Schema.Types.ObjectId, ref: 'Post'}],
  question: [{type: Schema.Types.ObjectId, ref: 'Question'}]
});



// var Post = mongoose.model('Post', postSchema);
// var Question = mongoose.model('Question', QuestionSchema);
var User = mongoose.model('User', userSchema);
module.exports = User;


