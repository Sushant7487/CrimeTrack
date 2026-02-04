
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Multer config
const { sendMessage, getMessages, getRecentChats } = require('../controllers/directChatController');

// Send Message (Text/Media)
router.post('/send', protect, upload.single('file'), sendMessage);

// Get Dashboard Inbox (List of people I talked to)
router.get('/recents', protect, getRecentChats);

// Get Specific Conversation History
router.get('/:partnerId', protect, getMessages);

module.exports = router;