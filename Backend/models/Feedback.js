// const mongoose = require('mongoose');

// const feedbackSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   type: {
//     type: String,
//     enum: ['Review', 'Suggestion'], // Distinguish between the two
//     required: true
//   },
//   rating: {
//     type: Number, // 1 to 5 Stars (Only for 'Review')
//     min: 1,
//     max: 5
//   },
//   comment: {
//     type: String, // The review text OR the suggestion text
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Feedback', feedbackSchema);











const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['Review', 'Suggestion'],
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  // ✅ NEW FIELD: To decide if it shows on Home Page
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema);