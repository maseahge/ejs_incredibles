var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
  name: String
});

var QuestionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    default: "Herein lies the key to your future!"
  },

  voteCount: {
    type: Number,
    default: 0
  },
  categories: [CategorySchema],
  createdAt: { type: Date, default: Date.now() }
});

// Static Methods
QuestionSchema.statics.findByCategory = function(category, cb) {
  return this.find({'categories.name': category}, cb);
}

// Instance Methods
// QuestionSchema.methods.voteUp = function(cb) {
//   this.voteCount++;
//   return this.save(cb);
// }

var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
