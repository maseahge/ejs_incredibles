var express = require('express');
var router = express.Router();
var postsController = require('../controllers/posts_controller');

router.route('/')
  .get(ensureAuthenticated, postsController.index)
  .post(ensureAuthenticated, postsController.create);

router.route('/new')
  .get(ensureAuthenticated, postsController.new);

router.route('/:id')
  .get(ensureAuthenticated, postsController.show)
  .patch(ensureAuthenticated, postsController.update)
  .delete(ensureAuthenticated, postsController.destroy);

router.route('/:id/edit')
  .get(ensureAuthenticated, postsController.edit);

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('message', 'welcome key is not present');
    res.redirect('/');
  }
}

module.exports = router;
