const mongoose = require('mongoose');

const designationSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  roleType: { type: String, enum: ['senior', 'police'], required: true } // To separate Senior vs Regular
}, { timestamps: true });

module.exports = mongoose.model('Designation', designationSchema);