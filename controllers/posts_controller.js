var Post = require('../models/post');
var User = require('../models/user');
var posts = {};

posts.index = function(req, res) {
  var posts = Post.find({}, function(err, posts) {
    if (err) {
      throw err;
    }
    // res.json(posts);
    // below code loads posts-index.ejs in view
    res.render('posts-index', { posts: posts });
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
      "category" : category,
      "content" : content
    }, function (err, post) {
      if (err) {
        // If it failed, return error
        res.send("There was a problem adding the information to the database.");
      } else {
        // And forward to success page
        res.redirect('/posts');
      }
  });
};

posts.create = function(req, res) {
  var post = new Post();
  post.title = req.body.title;
  post.category = req.body.category;
  post.content = req.body.content;
  User.find({}, function(err,users){
    if(err){
      throw err;
    }
    post.user.push(users[0]._id);
    post.save(function(err){
      if(err){
        throw err;
      }
      res.redirect('posts');
    });
    
  })

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
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      throw err;
    }
    res.render('posts-edit', {post: post});
  });
};

posts.update = function(req, res) {
  var title = req.body.title;
  var category = req.body.category;
  var content = req.body.content;

  console.log('body is: ' + req.body);

 //find the document by ID
  Post.findById(req.params.id, function (err, post) {
    //update it
    console.log('post to update is: ' + post);
    post.update({
      title : title,
      category : category,
      content : content,
    }, function (err, posts) {
      if (err) {
        res.send("There was a problem updating the information to the database: " + err);
      }
      else {
        res.redirect('/posts/' + post.id);
      }
    });
  });
};

posts.destroy = function(req, res) {
Post.findById(req.params.id, function (err, post) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            post.remove(function (err, post) {
                if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    console.log('DELETE removing ID: ' + post._id);
                    res.format({
                        //HTML returns us back to the main page, or you can create a success page
                          html: function(){
                               res.redirect("/posts");
                         },
                         //JSON returns the item with the message that is has been deleted
                        json: function(){
                               res.json({message : 'deleted',
                                   item : post
                               });
                         }
                      });
                }
            });
        }
    });
};



module.exports = posts;
