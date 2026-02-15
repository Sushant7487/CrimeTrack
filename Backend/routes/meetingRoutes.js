
const express = require('express');
const router = express.Router();
const { scheduleMeeting, getMyMeetings, getUsersForMeeting } = require('../controllers/meetingController');
const { protect } = require('../middleware/authMiddleware');

// Schedule new meeting
router.post('/schedule', protect, scheduleMeeting);

// Get meeting history/upcoming
router.get('/my-meetings', protect, getMyMeetings);

// ✅ NEW: Get Users for Dropdown (Solves "No users found")
router.get('/users', protect, getUsersForMeeting);

module.exports = router;