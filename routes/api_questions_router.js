var express = require('express');
var router = express.Router();
var questionsController = require('../controllers/api_questions_controller');

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/');
  }
}

router.route('/')
  .get(ensureAuthenticated, questionsController.index)
  .post(ensureAuthenticated, questionsController.create);

router.route('/new')
  .get(questionsController.new);

router.route('/:id')
  .get(questionsController.show)
  .patch(questionsController.update)
  .delete(questionsController.destroy);

router.route('/:id/edit')
  .get(questionsController.edit);

// router.patch('/:id/vote/up', questions.voteUp);
// router.patch('/:id/vote/down', questions.voteDown);
module.exports = router;

