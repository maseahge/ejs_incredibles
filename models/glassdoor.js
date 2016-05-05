var request = require('request');
var GLASSDOOR_PARTNER_ID = process.env.GLASSDOOR_PARTNER_ID
var GLASSDOOR_CLIENT_SECRECT = process.env.GLASSDOOR_CLIENT_SECRECT
var baseUrl = "http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p="+GLASSDOOR_PARTNER_ID+"&t.k="+GLASSDOOR_CLIENT_SECRECT+"&action=employers"

var companySearch = function(userIP, userAgent, searchEmp, searchLoc, cb){
  var url = baseUrl + "&userip=" + userIP + "&useragent=" + encodeURIComponent(userAgent) + "&q=" + searchEmp + "&l=" + searchLoc;
  console.log(url);
  request(url, function(err, res, body){
    console.log(err, res, body);
    if(!err && res.statusCode === 200){
      cb(body)
    }
  });
}


module.exports = companySearch;
