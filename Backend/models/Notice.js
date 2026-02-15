const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema({
  sender: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    designation: { type: String }, // e.g., "Inspector", "Station House Officer"
    station: { type: String }
  },
  receiver: {
    // Ideally rename 'type' to 'receiverType' to avoid reserved keyword confusion, 
    // but Mongoose handles 'type: { type: String }' correctly.
    type: { 
      type: String, 
      enum: ['citizen', 'officer', 'station'], 
      required: true 
    },
    targetId: { type: String }, // User ID (String/ObjectId) or Station Name
    targetName: { type: String } // Name of citizen/officer or Station Name
  },
  docType: {
    type: String,
    enum: ['Notice', 'Application', 'Circular'],
    default: 'Notice'
  },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  signatureUrl: { type: String }, // Cloudinary URL
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Notice', noticeSchema);