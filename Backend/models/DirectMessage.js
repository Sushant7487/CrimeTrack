
const mongoose = require("mongoose");

const DirectMessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  message: { type: String, default: "" },
  attachment: { type: String, default: null }, // URL for Image/Video/Audio/PDF
  fileType: { type: String, default: null },   // 'image', 'video', 'audio', 'pdf'
  
  // Status Tracking
  status: { 
      type: String, 
      enum: ['sent', 'delivered', 'seen'], 
      default: 'sent' 
  },
  
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("DirectMessage", DirectMessageSchema);