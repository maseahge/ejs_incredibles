var mongoose = require('mongoose')
  ,Schema = mongoose.Schema;

var CategorySchema = Schema({
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
  createdAt: { type: Date, default: Date.now() },
  // user: [{type: Schema.Types.ObjectId, ref: 'User'}]
  user: {type: String}
});

// Static Methods
QuestionSchema.statics.findByCategory = function(category, cb) {
  return this.find({'categories.name': category}, cb);
};

// Instance Methods
// QuestionSchema.methods.voteUp = function(cb) {
//   this.voteCount++;
//   return this.save(cb);
// }

var Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
