
var glassdoor = require('../models/glassdoor')
var baseUrl = "http://api.glassdoor.com/api/api.htm?v=1&format=json&t.p="+GLASSDOOR_PARTNER_ID+"&t.k="+GLASSDOOR_CLIENT_SECRECT+"&action=employers"

function searchGiphy(query){


	$.ajax({
	  url: 'http://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=&api_key=dc6zaTOxFJmzC',
	  success: function(data){
	  	console.log(data)
	  	// $('body').append('' + data)
	  	$('#results').html('<img src=' + data.data[0].images.fixed_height.url + '>')
	  	},
	  error: function(response){
	  	console.log('error time')
	  }
	 })
};

$('#searchBtn').click(function(){
	searchGiphy($('#searchBar').val())
})









// var searchGlassdoor = function(searchEmp, searchLoc){
//   $.ajax({
//     url: baseUrl + "&userip=" + userIP + "&useragent=" + encodeURIComponent(userAgent) + "&q=" + searchEmp + "&l=" + searchLoc;
//     success: function(data){
//       console.log(data)
//       $('#results').html('<img src="' + data.data[10].images.fixed_height.url + '">')
//     },
//     error: function(response){
//       $('#results').html("There was a problem :( ")
//     }
//   })
// };

// $('#clicker').click(function(){
//   searchGiphy($('#searchBar').val())
// });


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


// var button = $('#clicker');
// var companySearch = $('#companySearch');
// var location = $('#location');

// button.on('click', function(event){
// 	var searchEmp = companySearch.val()
//   	var searchLoc = location.val()
// });

// var searchGlassdoor = function(){
//  $('#clicker').on('click', function(event){
//    var searchEmp = companySearch.val(),
//    var searchLoc = location.val()}),
//    res.redirect('baseUrl + "&userip=" + userIP + "&useragent=" + encodeURIComponent(userAgent) + "&q=" + searchEmp + "&l=" + searchLoc;')
//  }


