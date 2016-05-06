var express = require('express');
var router = express.Router();
var glassdoor = require('../models/glassdoor');

router.get('/', function(req, res){
  // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.render('glassdoor');
  // });
});

router.get('/json', function(req, res){
  // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(req.query) // returns this object { company: 'facebook', location: 'illinois' }
  // when the query string is http://localhost:3000/glassdoor?company=facebook&location=illinois
  var ip = '127.0.0.1' // this should change on heroku to outside ip addresses
  glassdoor(ip, req.headers['user-agent'], req.query.company, req.query.location, function(results){
    res.send(results);
  });
});

module.exports= router;
