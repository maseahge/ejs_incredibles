var db = require('./db');
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




