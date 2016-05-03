var db = require('./db');
var Question = require('./models/quiz');

Question.remove({}, function(){

  Question.create([
    {title: "Your previous experience has nothing to do with coding, why should we hire you?", body: "Because I'm awesome", categories: [{name: "experience"}] },
    {title: "How would you explain Mongo DB to your grandma?", body: "With alot of difficulty", categories: [{name: "technical"}] },
    {title: "We want to offer you $15 per hour, do you accept?", body: "As long as there's nother $10 per hour hidden in there!", categories: [{name: "negotiation"}] },
    {title: "Why do you want to work here?", categories: [{name: "comapany"}] },
    {title: "What do you do in your free time?", categories: [{name: "comapany"}] },
  ], function(err, questions){

    // console.log(err, questions);
    Question.findByCategory("experience", function(err, question){
      console.log(err, question);
      process.exit();
    });

  });

});

var User = require('./models/user');

User.remove({}, function(){

  User.create([
    {githubUsername: 'quipcode'},
    {githubUsername: 'maseahge'}
  ], function(err, users){
    if (err) {
      console.log(err);
    }
    console.log('seeded ' + users.length + ' users');
    process.exit();
  });
});


