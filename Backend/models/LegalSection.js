const mongoose = require('mongoose');

const legalSectionSchema = mongoose.Schema({
  sectionName: { type: String, required: true, unique: true }, // e.g., "IPC 302 - Murder"
  category: { type: String, enum: ['IPC', 'NCR'], required: true } // To separate FIR sections vs NCR
}, { timestamps: true });

module.exports = mongoose.model('LegalSection', legalSectionSchema);