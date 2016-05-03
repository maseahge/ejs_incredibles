var Question = require('../models/quiz');
var questions = {}

questions.index = function(req, res) {
  Question.find({}, function(err, questions) {
    if (err) return res.json(err);
    res.json(questions);
  });
}

questions.create = function(req, res) {
  var title = req.body.title;
  var body = req.body.body;
  var question = new Question({ title: title, body: body });
  question.save(function(err, question){
    req.json(question);
  });
}

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
