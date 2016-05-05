var express = require('express');
var path = require('path');
var passport = require('passport');
var util = require('util');
var session = require('express-session');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var gdroutes = require('./routes/gdroutes');
var flash = require('req-flash');


//Quiz routes
var questionsRoute = require('./routes/api_questions_router');

var methodOverride = require('method-override');
var GitHubStrategy = require('passport-github2').Strategy;
var partials = require('express-partials');
var methodOverride = require('method-override');


var GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
var GITHUB_CLIENT_SECRET= process.env.GITHUB_CLIENT_SECRET;
var GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL;



// Use the GitHubStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and GitHub
//   profile), and invoke a callback with a user object.

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...

  User.findOne({githubUsername: profile.username}, function(err, user){
    if(!err && user !== null){
      done(null, user);
    } else {
      user = new User({
        fullName: profile.displayName,
        githubUsername: profile.username,
        githubProfile: profile.profileUrl
      });
      user.save(function(err){
        if(err){
          done(err);
        } else {
          done(null, user);
        }
      });
    }
  });
  }
));

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete GitHub profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  // console.log(user);
  done(null, user.githubUsername);
});

passport.deserializeUser(function(obj, done) {
  // console.log(obj);
  User.findOne({githubUsername: obj}, function(err, user){
    if(!err){
      done(null, user);
    } else {
      done(err, null);
    }
  });
});


//setting up routes
var routes = require('./routes/index');
var users = require('./routes/users');
var postRoutes = require('./routes/posts');
var questionsRoute = require('./routes/api_questions_router');
var welcome = require('./routes/welcome');

// requiring models
var db = require('./db');
var Post = require('./models/post');
var User = require('./models/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(partials());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: false }));
app.use(methodOverride('_method'));
app.use(flash({locals: 'flash'}));

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// setting up routes
app.use('/', routes);
app.use('/users', users);
app.use('/posts', postRoutes);
app.use('/welcome', welcome);
// Handling Quiz API requests
app.use('/questions', questionsRoute);
//Glassdoor API
app.use('/glassdoor', gdroutes);

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] })
  );

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res, next) {

    res.redirect('/logged_in');
  });

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/welcome');
  }
}

app.use('/posts', ensureAuthenticated);
app.use('/questions', ensureAuthenticated);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
