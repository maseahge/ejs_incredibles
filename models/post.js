var mongoose = require('mongoose')
	,Schema = mongoose.Schema

var postSchema = Schema({
  title: String,
  category: String,
  content: String,
  userId: String,
  createdAt: Date,
  updatedAt: Date,
  user: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;
