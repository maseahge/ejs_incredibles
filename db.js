var mongoose = require('mongoose');
var mongooseURL = process.env.MONGODB_URI || 'mongodb://localhost/ejs_incredibles';

mongoose.connect(mongooseURL);

module.exports = mongoose;


