
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








// const express = require('express');
// const router = express.Router();
// const multer = require('multer'); 
// const { 
//     registerUser, 
//     loginUser, 
//     logoutUser,      // ✅ Imported New Logout Controller
//     getAllUsers, 
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
// router.post('/logout', logoutUser); // ✅ Added New Logout Route
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
















//Changes from 09 feb



// const express = require('express');
// const router = express.Router();
// const multer = require('multer'); 
// const { 
//     registerUser, 
//     loginUser, 
//     logoutUser,      
//     getAllUsers, 
//     getAllOfficers, 
//     getUserById, 
//     deleteUser, 
//     transferOfficer, 
//     sendOtp, 
//     resetPassword,
//     updateUserProfile // ✅ Imported New Profile Update Controller
// } = require('../controllers/userController');
// const { protect } = require('../middleware/authMiddleware');

// // Configure Multer (Memory Storage)
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // === PUBLIC ROUTES ===
// router.post('/signup', upload.single('idPhoto'), registerUser); 
// router.post('/login', loginUser);
// router.post('/logout', logoutUser); 
// router.post('/send-otp', sendOtp);
// router.post('/reset-password', resetPassword);

// // === PROTECTED ROUTES ===

// // ✅ NEW: Update Profile Route (Auth + File Upload)
// // Placed before /:id to ensure specific route priority
// router.put('/profile', protect, upload.single('idPhoto'), updateUserProfile);

// // ✅ 1. General User List (Matches /api/users?role=citizen)
// router.get('/', protect, getAllUsers);

// // ✅ 2. Specific Collections
// router.get('/officers', protect, getAllOfficers); 

// // ✅ 3. Parameterized Routes (Must be last)
// router.get('/:id', protect, getUserById); 
// router.delete('/:id', protect, deleteUser);
// router.put('/transfer/:id', protect, transferOfficer);

// module.exports = router;










// const express = require('express');
// const router = express.Router();
// const multer = require('multer'); 
// const { 
//     registerUser, 
//     loginUser, 
//     logoutUser,      
//     getAllUsers, 
//     getAllOfficers, 
//     getUserById, 
//     deleteUser, 
//     transferOfficer, 
//     sendOtp, 
//     resetPassword,
//     updateUserProfile, // ✅ Existing Profile Update
//     updateUserByAdmin  // ✅ NEW: Imported Admin Update Controller
// } = require('../controllers/userController');

// // ✅ Updated middleware import to include 'admin'
// const { protect, admin } = require('../middleware/authMiddleware');

// // Configure Multer (Memory Storage)
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // === PUBLIC ROUTES ===
// router.post('/signup', upload.single('idPhoto'), registerUser); 
// router.post('/login', loginUser);
// router.post('/logout', logoutUser); 
// router.post('/send-otp', sendOtp);
// router.post('/reset-password', resetPassword);

// // === PROTECTED ROUTES ===

// // ✅ 1. User Self-Update (Auth + File Upload)
// router.put('/profile', protect, upload.single('idPhoto'), updateUserProfile);

// // ✅ 2. ADMIN ROUTE: Update Any User (Direct Edit)
// // Placed before generic /:id routes to avoid routing conflicts
// router.put('/:id/admin', protect, admin, upload.single('idPhoto'), updateUserByAdmin);

// // ✅ 3. General User Lists
// router.get('/', protect, getAllUsers); // Matches /api/users?role=...

// // ✅ 4. Specific Collections
// router.get('/officers', protect, getAllOfficers); 

// // ✅ 5. Parameterized Routes (Must be last)
// router.get('/:id', protect, getUserById); 
// router.delete('/:id', protect, deleteUser);
// router.put('/transfer/:id', protect, transferOfficer);

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const multer = require('multer'); 
// const { 
//     registerUser, 
//     loginUser, 
//     logoutUser,      
//     getAllUsers, 
//     getAllOfficers, 
//     getUserById, 
//     deleteUser, 
//     transferOfficer, 
//     sendOtp, 
//     resetPassword,
//     updateUserProfile, // User Self-Update
//     updateUserByAdmin  // ✅ Admin Direct Update
// } = require('../controllers/userController');

// const { protect, admin } = require('../middleware/authMiddleware');

// // Configure Multer (Memory Storage for Images)
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // === PUBLIC ROUTES ===
// router.post('/signup', upload.single('idPhoto'), registerUser); 
// router.post('/login', loginUser);
// router.post('/logout', logoutUser); 
// router.post('/send-otp', sendOtp);
// router.post('/reset-password', resetPassword);

// // === PROTECTED ROUTES ===

// // 1. User Self-Update (Auth + File Upload)
// router.put('/profile', protect, upload.single('idPhoto'), updateUserProfile);

// // 2. ✅ ADMIN ROUTE: Update Any User (Direct Edit)
// // Placed before generic /:id routes to avoid routing conflicts
// router.put('/:id/admin', protect, admin, upload.single('idPhoto'), updateUserByAdmin);

// // 3. General User Lists
// router.get('/', protect, getAllUsers); // Matches /api/users?role=...

// // 4. Specific Collections
// router.get('/officers', protect, getAllOfficers); 

// // 5. Parameterized Routes (Must be last)
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
    logoutUser,       
    getAllUsers, 
    getAllOfficers, 
    getUserById, 
    deleteUser, 
    transferOfficer, 
    sendOtp, 
    resetPassword,
    updateUserProfile, // ✅ Added from 1.3
    updateUserByAdmin  // ✅ Added from 1.3
} = require('../controllers/userController');

// ✅ Imported 'admin' middleware
const { protect, admin } = require('../middleware/authMiddleware');

// Configure Multer (Memory Storage for Images)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// === PUBLIC ROUTES ===
router.post('/signup', upload.single('idPhoto'), registerUser); 
router.post('/login', loginUser);
router.post('/logout', logoutUser); 
router.post('/send-otp', sendOtp);
router.post('/reset-password', resetPassword);

// === PROTECTED ROUTES ===

// 1. ✅ User Self-Update (Auth + File Upload)
// Must be before /:id to prevent "profile" being treated as an ID
router.put('/profile', protect, upload.single('idPhoto'), updateUserProfile);

// 2. ✅ ADMIN ROUTE: Update Any User (Direct Edit)
// Uses the 'admin' middleware we created
router.put('/:id/admin', protect, admin, upload.single('idPhoto'), updateUserByAdmin);

// 3. General User Lists (Matches /api/users?role=...)
router.get('/', protect, getAllUsers); 

// 4. Specific Collections
router.get('/officers', protect, getAllOfficers); 

// 5. Parameterized Routes (Must be last)
router.get('/:id', protect, getUserById); 
router.delete('/:id', protect, deleteUser);
router.put('/transfer/:id', protect, transferOfficer);

module.exports = router;