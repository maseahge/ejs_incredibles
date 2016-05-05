// app.get('/log/goal', function(req, res){
//     //Setup your client
//     var client = http.createClient(80, 'http://[put the base url to the api here]');
//     //Setup the request by passing the parameters in the URL (REST API)
//     var request = client.request('GET', '/api/action/param1/value1/param2/value2', {"host":"[put base url here again]"});


//     request.addListener("response", function(response) { //Add listener to watch for the response
//         var body = "";
//         response.addListener("data", function(data) { //Add listener for the actual data
//             body += data; //Append all data coming from api to the body variable
//         });

//         response.addListener("end", function() { //When the response ends, do what you will with the data
//             var response = JSON.parse(body); //In this example, I am parsing a JSON response
//         });
//     });
//     request.end();
//     res.send(response); //Print the response to the screen
// });

// http://api.glassdoor.com/api/api.htm?t.p=5317&t.k=n07aR34Lk3Y&userip=0.0.0.0&useragent=&format=json&v=1&action=employers

//   function requestJSON(url, callback) {
//     $.ajax({
//       url: url,
//       complete: function(xhr) {
//         callback.call(null, xhr.responseJSON);
//       }
//     });
//   }
