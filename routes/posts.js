var express = require('express');
var router = express.Router();
var postsController = require('../controllers/posts_controller')

router.route('/')
  .get(postsController.index)
  .post(postsController.create);

router.route('/new')
  .get(postsController.new);

router.route('/:id')
  .get(postsController.show)
  .patch(postsController.update)
  .delete(postsController.destroy);

router.route('/:id/edit')
  .get(postsController.edit);

module.exports = router;
