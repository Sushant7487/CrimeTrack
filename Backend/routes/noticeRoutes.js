const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect } = require('../middleware/authMiddleware');
const { sendNotice, getMyNotices, getSentNotices, searchReceivers } = require('../controllers/noticeController');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/send', protect, upload.single('signature'), sendNotice);
router.get('/inbox', protect, getMyNotices);
router.get('/sent', protect, getSentNotices);
router.get('/search-users', protect, searchReceivers);

module.exports = router;