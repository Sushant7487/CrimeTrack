const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { 
    getPublicContent, 
    updateMarquee, 
    addFAQ, 
    deleteFAQ, 
    toggleReviewFeature 
} = require('../controllers/homePageController');

// === PUBLIC ROUTE ===
router.get('/public', getPublicContent);

// === ADMIN ROUTES ===
router.put('/marquee', protect, admin, updateMarquee);
router.post('/faq', protect, admin, addFAQ);
router.delete('/faq/:id', protect, admin, deleteFAQ);
router.put('/reviews/:id/toggle', protect, admin, toggleReviewFeature);

module.exports = router;