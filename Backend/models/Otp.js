const mongoose = require('mongoose');

const otpSchema = mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, index: { expires: 300 } } // 5 Minute mein delete ho jayega
});

module.exports = mongoose.model('Otp', otpSchema);