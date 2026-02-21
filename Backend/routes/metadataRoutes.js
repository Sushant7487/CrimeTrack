// const express = require('express');
// const router = express.Router();
// const { 
//     getAllMetadata,
//     getStations, addStation, deleteStation,
//     getDesignations, addDesignation, deleteDesignation,
//     getLegalSections, addLegalSection, deleteLegalSection
// } = require('../controllers/metadataController');

// // Middleware
// const { protect, admin } = require('../middleware/authMiddleware');

// // === PUBLIC ROUTE (For Signup/Forms) ===
// router.get('/all', getAllMetadata);

// // === ADMIN MANAGEMENT ROUTES (Protected) ===

// // 1. Stations
// router.get('/stations', protect, admin, getStations);
// router.post('/stations', protect, admin, addStation);
// router.delete('/stations/:id', protect, admin, deleteStation);

// // 2. Designations
// router.get('/designations', protect, admin, getDesignations);
// router.post('/designations', protect, admin, addDesignation);
// router.delete('/designations/:id', protect, admin, deleteDesignation);

// // 3. Legal Sections
// router.get('/sections', protect, admin, getLegalSections);
























const express = require('express');
const router = express.Router();
const { 
    getAllMetadata,
    getStations, addStation, deleteStation,
    getDesignations, addDesignation, deleteDesignation,
    getLegalSections, addLegalSection, deleteLegalSection,
    getCrimeTypes, addCrimeType, deleteCrimeType // ✅ ADDED: Crime Type controllers
} = require('../controllers/metadataController');

// Middleware
const { protect, admin } = require('../middleware/authMiddleware');

// === PUBLIC ROUTE (For Signup/Forms) ===
router.get('/all', getAllMetadata);

// === ADMIN MANAGEMENT ROUTES (Protected) ===

// 1. Stations
router.get('/stations', protect, admin, getStations);
router.post('/stations', protect, admin, addStation);
router.delete('/stations/:id', protect, admin, deleteStation);

// 2. Designations
router.get('/designations', protect, admin, getDesignations);
router.post('/designations', protect, admin, addDesignation);
router.delete('/designations/:id', protect, admin, deleteDesignation);

// 3. Legal Sections
router.get('/sections', protect, admin, getLegalSections);
router.post('/sections', protect, admin, addLegalSection);
router.delete('/sections/:id', protect, admin, deleteLegalSection);

// ✅ ADDED: 4. Crime Types
router.get('/crimetypes', protect, admin, getCrimeTypes);
router.post('/crimetypes', protect, admin, addCrimeType);
router.delete('/crimetypes/:id', protect, admin, deleteCrimeType);

module.exports = router;
// router.post('/sections', protect, admin, addLegalSection);
// router.delete('/sections/:id', protect, admin, deleteLegalSection);

module.exports = router;
