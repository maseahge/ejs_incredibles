var express = require('express');
var router = express.Router();
var glassdoor = require('../models/glassdoor');

router.get('/', function(req, res){
  // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  // console.log(req.query)
  // // { company: 'facebook', location: 'illinois' }
  // var ip = '127.0.0.1' // this should change on heroku to outside ip addresses
  // glassdoor(ip, req.headers['user-agent'], req.query.company, req.query.location, function(results){
    res.render('glassdoor');
  // });
});

router.get('/json', function(req, res){
  // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(req.query)
  // { company: 'facebook', location: 'illinois' }
  var ip = '127.0.0.1' // this should change on heroku to outside ip addresses
  glassdoor(ip, req.headers['user-agent'], req.query.company, req.query.location, function(results){
    res.send(results);
  });
});

module.exports= router;
