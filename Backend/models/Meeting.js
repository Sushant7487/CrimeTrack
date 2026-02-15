const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    roomName: {
        type: String,
        required: true,
        unique: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    meetingType: {
        type: String,
        enum: ['Police', 'Citizen'], // Internal vs Public
        default: 'Citizen'
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Live', 'Completed', 'Cancelled'],
        default: 'Scheduled'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Meeting', meetingSchema);