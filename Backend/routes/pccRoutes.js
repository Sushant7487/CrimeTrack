const express = require('express'); // ✅ Fixed the import to 'express'
const router = express.Router();
const { 
    submitPCCApplication, 
    getMyPCCApplications, 
    getStationPCCApplications,
    generatePCCCertificate // ✅ Imported the new controller function
} = require('../controllers/pccController');
const { protect } = require('../middleware/authMiddleware'); // Your auth middleware
const upload = require('../utils/upload'); // Your multer/cloudinary config

// Route to submit a new application
// Using upload.fields to handle multiple specific files
router.post('/apply', protect, upload.fields([
    { name: 'applicantPhoto', maxCount: 1 },
    { name: 'aadharFront', maxCount: 1 },
    { name: 'aadharBack', maxCount: 1 }
]), submitPCCApplication);

// Route to fetch citizen's applications
router.get('/my-applications', protect, getMyPCCApplications);

// ==========================================
// ✅ NEW: Route for police to fetch station-specific PCCs
// ==========================================
router.get('/station-applications', protect, getStationPCCApplications);

// ==========================================
// ✅ NEW: Route for police to generate the final certificate (Uploads signature)
// ==========================================
router.put('/generate/:id', protect, upload.single('signature'), generatePCCCertificate);

module.exports = router;