var glassdoor = require('../models/glassdoor')
var baseUrl = "http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p="+GLASSDOOR_PARTNER_ID+"&t.k="+GLASSDOOR_CLIENT_SECRECT+"&action=employers"

var searchGlassdoor = function(searchEmp, searchLoc){
  $.ajax({
    url: baseUrl + "&userip=" + userIP + "&useragent=" + encodeURIComponent(userAgent) + "&q=" + searchEmp + "&l=" + searchLoc;
    success: function(data){
      console.log(data)
      $('#results').html('<img src="' + data.data[10].images.fixed_height.url + '">')
    },
    error: function(response){
      $('#results').html("There was a problem :( ")
    }
  })
};

$('#clicker').click(function(){
  searchGiphy($('#searchBar').val())
});


// var searchGiphy = function(query){
//   // get the first image out of an array of results from searching 'funny cat':
//   $.ajax({
//     url: 'http://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=dc6zaTOxFJmzC',
//     success: function(data){
//       console.log(data)
//       $('#showMe').html('<img src="' + data.data[10].images.fixed_height.url + '">')
//     },
//     error: function(response){
//       $('#showMe').html("There was a problem :( ")
//     }
//   })
// };

// $('#clicker').click(function(){
//   searchGiphy($('#searchBar').val())
// });

