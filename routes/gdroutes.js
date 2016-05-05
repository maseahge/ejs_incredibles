var express = require('express');
var router = express.Router();
var glassdoor = require('../models/glassdoor')

router.get('/', function(req, res){
  // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  var ip = '127.0.0.1' // this should change on heroku to outside ip addresses
  glassdoor(ip, req.headers['user-agent'], 'google', 'california', function(results){
    res.render('glassdoor', {results: results});
  })
})


module.exports= router;
