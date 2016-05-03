var express = require('express');
var router = express.Router();
var questions = require('../controllers/api_quiz_controller');

router.get('/', questions.index);
router.post('/', questions.create);
router.patch('/:id', questions.update);
router.get('/:id', questions.show);

// router.patch('/:id/vote/up', questions.voteUp);
// router.patch('/:id/vote/down', questions.voteDown);
module.exports = router;
