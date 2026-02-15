const mongoose = require('mongoose');

const homeSettingsSchema = new mongoose.Schema({
  type: {
    type: String,
    default: 'general' // We only need one document
  },
  marqueeText: {
    type: String,
    default: "Welcome to the Official Crime Reporting Portal. Please report incidents responsibly. Emergency Dial 112."
  }
});

module.exports = mongoose.model('HomeSettings', homeSettingsSchema);