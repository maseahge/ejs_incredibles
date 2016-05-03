//mongoose stuff
var mongoose = require('mongoose');
var mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/the_incredibles';
mongoose.connect(mongoUrl);

module.exports = mongoose;
