var Post = require('../models/post');
var posts = {};

posts.index = function(req, res) {
  Post.find({}, function(err, posts) {
    if (err) {
      throw err;
    }
    res.json(posts);
  });
};

posts.new = function(req, res) {
  res.render('posts-new', { title: 'Posts' });
    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var title = req.body.username;
    var body = req.body.category;

    // Set our collection
    var collection = db.get('post');

    collection.insert({
      "title" : title,
      "category" : category
    }, function (err, doc) {
      if (err) {
        // If it failed, return error
        res.send("There was a problem adding the information to the database.");
      }
      else {
        // And forward to success page
        res.redirect('/posts');
      }
  });
};

posts.create = function(req, res) {
  var post = new Post();
  post.title = req.body.title;
  post.category = req.body.category;

  post.save(function(err){
    if(err){
      throw err;
    }
    res.redirect('posts');
  });
};

posts.show = function(req, res) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      throw err;
    }
    res.render('posts-show', {post: post});
  });
};

posts.edit = function(req, res) {

};

posts.update = function(req, res) {

};

posts.destroy = function(req, res) {

};

module.exports = posts;
