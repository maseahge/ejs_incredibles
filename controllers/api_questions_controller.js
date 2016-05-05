var Question = require('../models/question');
var questions = {}

questions.index = function(req, res) {
  Question.find({}, function(err, questions) {
    if (err) {
      throw err;
    }
    res.render('questions/index', {questions: questions});
  });
}

questions.new = function(req, res) {
  res.render('questions/new', { title: 'Questions' });
    // Set the internal database variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var title = req.body.username;
    var body = req.body.category;

    // Set collection
    var collection = db.get('question');

    collection.insert({
      "title" : title,
      "category" : category,
      "content" : content
    }, function (err, doc) {
      if (err) {
        // If it failed, return error
        res.send("There was a problem adding the information to the database.");
      }
      else {
        // And forward to success page
        res.redirect('/questions');
      }
  });
};

questions.create = function(req, res) {
  var question = new Question();
  question.title = req.body.title;
  question.category = req.body.category;
  question.body = req.body.body;
  console.log(req.body);

  question.save(function(err, question){
    if(err){
      throw err;
    }
    res.redirect('/questions');
  });
};


questions.show = function(req, res) {
  Question.findById(req.params.id, function(err, question){
    if (err) {
      throw err;
    }
    res.render('questions/show', {question: question});
  });
}

questions.edit = function(req, res) {
  Question.findById(req.params.id, function(err, question) {
    if (err) {
      throw err;
    }
    res.render('questions/edit', {question: question});
  });
};

questions.update = function(req, res) {
  var title = req.body.title;
  var category = req.body.category;
  var content = req.body.body;

  console.log('body is: ' + req.body.body);

 //find the document by ID
  Question.findById(req.params.id, function (err, question) {
    //update it
    console.log('Updating question: ' + question);
    question.update({
      title : title,
      category : category,
      body : content,
    }, function (err, questions) {
      if (err) {
        res.send("There was a problem updating the information to the database: " + err);
      }
      else {
        res.redirect('/questions/' + question.id);
      }
    });
  });
};


questions.destroy = function(req, res) {
Question.findById(req.params.id, function (err, question) {
        if (err) {
            return console.error(err);
        } else {
            //remove it from Mongo
            question.remove(function (err, question) {
                if (err) {
                    return console.error(err);
                } else {
                    //Returning success messages saying it was deleted
                    console.log('DELETE removing ID: ' + question._id);
                    res.format({
                        //HTML returns us back to the main page, or you can create a success page
                          html: function(){
                               res.redirect("/questions");
                         },
                         //JSON returns the item with the message that is has been deleted
                        json: function(){
                               res.json({message : 'deleted',
                                   item : question
                               });
                         }
                      });
                }
            });
        }
    });
}
module.exports = questions;


// api/questions/:id?vote=up
// api/questions/:id?vote=down
// questions.update = function(req, res) {
//   Question.findById( req.params.id, function(err, question){
//     if (err) {
//       return res.json(err);
//     }
//     if (req.query.vote === "up") {
//       question.voteUp(function(err, question){
//         if (err) {
//           return res.json(err);
//         }
//         return res.json(question);
//       });
//     }
//     if (req.query.vote === "down") {
//       question.voteCount -= 1;
//       question.save(function(err, question){
//         if (err) {
//           return res.json(err);
//         }
//         return res.json(question);
//       });
//     }
//   });
// }

// api/questions/:id/vote/up
// questions.voteUp = function(req, res) {
//   Question.findById( req.params.id, function(err, question){
//     if (err) {
//       return res.json(err);
//     }
//     question.voteUp(function(err, question){
//       if (err) {
//         return res.json(err);
//       }
//       return res.json(question);
//     });
//   });
// }

// questions.voteDown = function(req, res) {
//   Question.findById( req.params.id, function(err, question){
//     if (err) {
//       return res.json(err);
//     }
//     question.voteCount -= 1;
//     question.save(function(err, question){
//       if (err) {
//         return res.json(err);
//       }
//       return res.json(question);
//     });
//   });
// }


