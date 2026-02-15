// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const { protect, admin } = require('../middleware/authMiddleware');
// const { 
//   createHelpTicket, 
//   getMyTickets, 
//   getAllTickets, 
//   replyToTicket, 
//   submitFeedback, 
//   getAllFeedback 
// } = require('../controllers/supportController');

// // Multer config for screenshots
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // --- USER ROUTES ---
// router.post('/help', protect, upload.single('screenshot'), createHelpTicket); // Submit Ticket
// router.get('/help/my-tickets', protect, getMyTickets); // View My Tickets (with Admin replies)
// router.post('/feedback', protect, submitFeedback); // Submit Review/Suggestion

// // --- ADMIN ROUTES ---
// router.get('/admin/help', protect, admin, getAllTickets); // View All Tickets
// router.put('/admin/help/:ticketId/reply', protect, admin, replyToTicket); // Reply to Ticket
// router.get('/admin/feedback', protect, admin, getAllFeedback); // View Reviews/Suggestions

// module.exports = router;



const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect, admin } = require('../middleware/authMiddleware');
const { 
  createHelpTicket, 
  getMyTickets, 
  getAllTickets, 
  replyToTicket, 
  submitFeedback, 
  getAllFeedback,
  promoteToFAQ // ✅ Import
} = require('../controllers/supportController');

// Multer config for screenshots
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- USER ROUTES ---
router.post('/help', protect, upload.single('screenshot'), createHelpTicket); // Submit Ticket
router.get('/help/my-tickets', protect, getMyTickets); // View My Tickets (with Admin replies)
router.post('/feedback', protect, submitFeedback); // Submit Review/Suggestion

// --- ADMIN ROUTES ---
router.get('/admin/help', protect, admin, getAllTickets); // View All Tickets
router.put('/admin/help/:ticketId/reply', protect, admin, replyToTicket); // Reply to Ticket
router.get('/admin/feedback', protect, admin, getAllFeedback); // View Reviews/Suggestions

// ✅ NEW ROUTE: Promote to FAQ
router.post('/admin/help/:ticketId/promote', protect, admin, promoteToFAQ);

module.exports = router;