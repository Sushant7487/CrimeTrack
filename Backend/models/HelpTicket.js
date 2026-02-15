const mongoose = require('mongoose');

const helpTicketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    default: "Help Request"
  },
  message: {
    type: String,
    required: true
  },
  screenshot: {
    type: String, // URL from Cloudinary
    default: null
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved'],
    default: 'Open'
  },
  adminReply: {
    type: String,
    default: null
  },
  adminRepliedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('HelpTicket', helpTicketSchema);