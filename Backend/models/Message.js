
const mongoose = require('mongoose');

const messageSchema = mongoose.Schema(
  {
    complaintId: { type: mongoose.Schema.Types.ObjectId, ref: 'CrimeReport', required: true },
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ NEW: For Private Chat
    senderName: { type: String, required: true },
    senderRole: { type: String, required: true }, // 'citizen', 'police', 'senior'
    message: { type: String, required: true },
    time: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
