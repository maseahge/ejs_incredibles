var Question = require('../models/quiz');
var questions = {}

questions.index = function(req, res) {
  Question.find({}, function(err, questions) {
    if (err) {
      throw err;
    }
    res.render('quiz_index', {questions: questions});
  });
}

questions.create = function(req, res) {
  var title = req.body.title;
  var body = req.body.body;
  var question = new Question({ title: title, body: body });
  question.save(function(err, question){
    if(err){
      throw err;
    }
    res.redirect('questions');
  });
};
// app.post('/questions_show', (req, res) => {
//   db.collection('quotes').save(req.body, (err, result) => {
//     if (err) return console.log(err)

//     console.log('saved to database')
//     res.redirect('/')
//   })
// })

questions.new = function(req, res) {
  res.render('questions-new', { title: 'Questions' });
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

questions.show = function(req, res) {
  Question.findById(req.params.id, function(err, question){
    if (err) {
      throw err;
    }
    res.render('questions_show', {question: question});
  });
}

questions.update = function(req, res){

  // async javascript version that needs callbacks
  Question.findById(req.params.id, function(err, question){
    question.voteUp(function(err, question){
      res.json(question);
    });

  });

}
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

module.exports = questions;
