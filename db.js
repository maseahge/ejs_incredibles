var mongoose = require('mongoose');
var mongooseURL = process.env.MONGO_URL || 'mongodb://localhost/ejs_incredibles_dev';
mongoose.connect(mongooseURL);

module.exports = mongoose;
