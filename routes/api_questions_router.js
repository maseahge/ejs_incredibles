var express = require('express');
var router = express.Router();
var questionsController = require('../controllers/api_questions_controller');

router.route('/')
  .get(questionsController.index)
  .post(questionsController.create);

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

