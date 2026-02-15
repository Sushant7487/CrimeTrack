
// const express = require('express');
// const router = express.Router();
// const { 
//     createReport, 
//     getAllReports, 
//     getPastCrimes, 
//     getMyReports, 
//     getReportById, 
//     updateReportStatus, 
//     fileOfficialRecord, 
//     triggerSOS, 
//     fileFIR, 
//     getStats 
// } = require('../controllers/crimeController');

// const { protect } = require('../middleware/authMiddleware');
// const upload = require('../middleware/uploadMiddleware');

// // ==========================
// // CITIZEN ROUTES
// // ==========================

// // 1. Create Report
// // ✅ FIXED: Added incidentProof field to the upload configuration
// router.post('/report', protect, upload.fields([
//     { name: 'victimIdPhoto', maxCount: 1 },  
//     { name: 'suspectIdPhoto', maxCount: 1 }, 
//     { name: 'evidence', maxCount: 10 },       // Existing field
//     { name: 'incidentProof', maxCount: 10 }   // ✅ NEW: Supports Photos, Videos, Audio
// ]), createReport);

// // 2. FIX: Exact spelling match for Frontend request
// router.get('/myreports', protect, getMyReports);

// // 3. Trigger SOS
// router.post('/sos', triggerSOS);


// // ==========================
// // POLICE / DASHBOARD ROUTES
// // ==========================

// // 4. File Official FIR/NCR
// router.post('/file-record', protect, upload.array('policeEvidence'), fileOfficialRecord);

// // 5. Get All Reports
// router.get('/all', protect, getAllReports);

// // 6. Get Single Report
// router.get('/track/:id', protect, getReportById);

// // 7. Update Status
// router.put('/update/:id', protect, updateReportStatus);

// // 8. History
// router.get('/history', protect, getPastCrimes);

// // 9. Stats
// router.get('/stats', getStats);

// module.exports = router;














const express = require('express');
const router = express.Router();
const { 
    createReport, getAllReports, getPastCrimes, getMyReports, getReportById, 
    updateReportStatus, fileOfficialRecord, triggerSOS, fileFIR, getStats,
    updateLiveLocation // ✅ Import
} = require('../controllers/crimeController');

const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// ==========================
// CITIZEN ROUTES
// ==========================
router.post('/report', protect, upload.fields([
    { name: 'victimIdPhoto', maxCount: 1 },  
    { name: 'suspectIdPhoto', maxCount: 1 }, 
    { name: 'evidence', maxCount: 10 },       
    { name: 'incidentProof', maxCount: 10 }   
]), createReport);

router.get('/myreports', protect, getMyReports);
router.post('/sos', triggerSOS);

// ✅ NEW: Continuous Tracking Route
router.put('/track/update/:id', protect, updateLiveLocation);

// ==========================
// POLICE / DASHBOARD ROUTES
// ==========================
router.post('/file-record', protect, upload.array('policeEvidence'), fileOfficialRecord);
router.get('/all', protect, getAllReports);
router.get('/track/:id', protect, getReportById);
router.put('/update/:id', protect, updateReportStatus);
router.get('/history', protect, getPastCrimes);
router.get('/stats', getStats);

module.exports = router;