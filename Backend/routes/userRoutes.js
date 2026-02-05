
// const express = require('express');
// const router = express.Router();
// const multer = require('multer'); 
// const { 
//     registerUser, 
//     loginUser, 
//     getAllUsers,     // ✅ Imported New Controller
//     getAllOfficers, 
//     getUserById, 
//     deleteUser, 
//     transferOfficer, 
//     sendOtp, 
//     resetPassword 
// } = require('../controllers/userController');
// const { protect } = require('../middleware/authMiddleware');

// // Configure Multer (Memory Storage)
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // === PUBLIC ROUTES ===
// router.post('/signup', upload.single('idPhoto'), registerUser); 
// router.post('/login', loginUser);
// router.post('/send-otp', sendOtp);
// router.post('/reset-password', resetPassword);

// // === PROTECTED ROUTES ===

// // ✅ 1. General User List (Matches /api/users?role=citizen)
// router.get('/', protect, getAllUsers);

// // ✅ 2. Specific Collections
// router.get('/officers', protect, getAllOfficers); 

// // ✅ 3. Parameterized Routes (Must be last)
// router.get('/:id', protect, getUserById); 
// router.delete('/:id', protect, deleteUser);
// router.put('/transfer/:id', protect, transferOfficer);

// module.exports = router;








const express = require('express');
const router = express.Router();
const multer = require('multer'); 
const { 
    registerUser, 
    loginUser, 
    logoutUser,      // ✅ Imported New Logout Controller
    getAllUsers, 
    getAllOfficers, 
    getUserById, 
    deleteUser, 
    transferOfficer, 
    sendOtp, 
    resetPassword 
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Configure Multer (Memory Storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// === PUBLIC ROUTES ===
router.post('/signup', upload.single('idPhoto'), registerUser); 
router.post('/login', loginUser);
router.post('/logout', logoutUser); // ✅ Added New Logout Route
router.post('/send-otp', sendOtp);
router.post('/reset-password', resetPassword);

// === PROTECTED ROUTES ===

// ✅ 1. General User List (Matches /api/users?role=citizen)
router.get('/', protect, getAllUsers);

// ✅ 2. Specific Collections
router.get('/officers', protect, getAllOfficers); 

// ✅ 3. Parameterized Routes (Must be last)
router.get('/:id', protect, getUserById); 
router.delete('/:id', protect, deleteUser);
router.put('/transfer/:id', protect, transferOfficer);

module.exports = router;