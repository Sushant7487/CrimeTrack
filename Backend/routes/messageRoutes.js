
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const CrimeReport = require('../models/CrimeReport');
const { protect } = require('../middleware/authMiddleware');

// 1. Get Messages (Strict Privacy)
router.get('/:complaintId', protect, async (req, res) => {
  try {
    const { complaintId } = req.params;
    const currentUserId = req.user._id.toString();
    const userRole = req.user.role;

    // Report exist check
    const report = await CrimeReport.findById(complaintId);
    if (!report) return res.status(404).json({ message: "Complaint not found" });

    // ✅ PRIVACY QUERY
    let query = { complaintId: complaintId };

    if (userRole === 'citizen') {
        // Citizen sees ALL messages related to their complaint (sent by them OR sent to them)
        // Actually, Citizen should see chats with ALL officers, but grouped.
        // We fetch ALL messages for this complaint where Citizen is involved.
        query.$or = [
            { senderId: currentUserId },
            { recipientId: currentUserId }
        ];
    } else {
        // 👮‍♂️ POLICE/SENIOR PRIVACY RULE:
        // Officer can ONLY see messages sent BY them OR sent TO them.
        // They CANNOT see messages between Citizen and Other Officers.
        query.$or = [
            { senderId: currentUserId },
            { recipientId: currentUserId }
        ];
    }

    const messages = await Message.find(query).sort({ createdAt: 1 }); // Sort oldest to newest
    res.json(messages);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// 2. Send Message
router.post('/', protect, async (req, res) => {
  const { complaintId, senderId, recipientId, senderName, message, time, senderRole } = req.body;
  try {
    const newMessage = await Message.create({ 
        complaintId, 
        senderId, 
        recipientId, // ✅ Saving Target User
        senderName, 
        message, 
        time,
        senderRole 
    });
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
















// const express = require('express');
// const router = express.Router();
// const Message = require('../models/Message');
// const CrimeReport = require('../models/CrimeReport');
// const { protect } = require('../middleware/authMiddleware');
// const upload = require('../middleware/uploadMiddleware'); // ✅ Upload Middleware

// // 1. Get Complaint Messages
// router.get('/:complaintId', protect, async (req, res) => {
//   try {
//     const { complaintId } = req.params;
//     const currentUserId = req.user._id.toString();
    
//     // Validate Complaint
//     if(complaintId.length !== 24) return res.status(400).json({ message: "Invalid ID" });

//     const messages = await Message.find({ 
//         complaintId,
//         $or: [{ senderId: currentUserId }, { recipientId: currentUserId }]
//     }).sort({ createdAt: 1 });
    
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// // 2. ✅ Get Direct Messages (Police Connect)
// router.get('/direct/:userId/:otherId', protect, async (req, res) => {
//     try {
//         const { userId, otherId } = req.params;
//         const messages = await Message.find({
//             $or: [
//                 { senderId: userId, recipientId: otherId, complaintId: null },
//                 { senderId: otherId, recipientId: userId, complaintId: null }
//             ]
//         }).sort({ createdAt: 1 });
//         res.json(messages);
//     } catch (error) {
//         res.status(500).json({ message: "Chat Error" });
//     }
// });

// // 3. Send Message (✅ Handles Files)
// router.post('/', protect, upload.single('file'), async (req, res) => {
//   try {
//     const { complaintId, senderId, recipientId, senderName, message, time, senderRole } = req.body;
    
//     let attachment = null;
//     let fileType = null;

//     if (req.file) {
//         attachment = req.file.path;
//         fileType = req.file.mimetype.includes('pdf') ? 'pdf' : 'image';
//     }

//     const newMessage = await Message.create({ 
//         complaintId: (complaintId && complaintId !== 'null') ? complaintId : null, 
//         senderId, 
//         recipientId, 
//         senderName, 
//         message: message || (req.file ? "📎 Attachment" : ""), 
//         attachment,
//         fileType,
//         time,
//         senderRole 
//     });
//     res.status(200).json(newMessage);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json(error);
//   }
// });

// module.exports = router;