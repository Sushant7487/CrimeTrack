
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: ['citizen', 'police', 'senior'],
    },
    // ✅ Title (Prefix)
    title: { 
      type: String, 
      required: true, 
      enum: ['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Other'] 
    }, 
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    mobile: { type: String, required: true },
    gender: { type: String, required: true },
    
    aadhar: { type: String },

    // ✅ ID Photo Field
    idPhoto: { 
      type: String, 
      required: [true, 'ID Photo is required'] 
    },

    station: { type: String },
    designation: { type: String },
    secretCode: { type: String },

    // ✅ NEW FIELDS FOR CHAT STATUS
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);




