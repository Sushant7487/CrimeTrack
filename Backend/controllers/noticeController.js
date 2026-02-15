// const Notice = require('../models/Notice');
// const User = require('../models/User');
// const Station = require('../models/Station'); // ✅ IMPORTED STATION MODEL
// const { uploadToCloudinary } = require('../utils/cloudinary');
// const { sendNoticeAlert } = require('../utils/emailService'); 
// const mongoose = require('mongoose');

// // ==========================================
// // 1. SEND NOTICE (Police/Senior Only)
// // ==========================================
// const sendNotice = async (req, res) => {
//   try {
//     const { receiverType, targetId, subject, body, docType } = req.body;
//     const sender = req.user; // From authMiddleware

//     // --- 1. Handle Signature Upload ---
//     let signatureUrl = null;
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       signatureUrl = result.secure_url;
//     }

//     // --- 2. Determine Receiver Details ---
//     let targetName = "Unknown";
//     let receiverEmail = null;

//     if (receiverType === 'station') {
//       targetName = targetId; // For station, targetId is the Station Name text
//       // Note: Stations might not have a direct email in this context, logic skipped
//     } else {
//       // Validate MongoDB ID before querying
//       if (!mongoose.Types.ObjectId.isValid(targetId)) {
//         return res.status(400).json({ message: "Invalid Receiver ID" });
//       }

//       const targetUser = await User.findById(targetId);
//       if (!targetUser) return res.status(404).json({ message: "Receiver not found" });
      
//       // ✅ MERGE: Save formatted name with Title for PDF
//       targetName = `${targetUser.title} ${targetUser.firstName} ${targetUser.lastName}`;
//       receiverEmail = targetUser.email;
//     }

//     // --- 3. Create Notice Entry ---
//     const notice = await Notice.create({
//       sender: {
//         id: sender._id,
//         // ✅ MERGE: Save Sender Name with Title
//         name: `${sender.title} ${sender.firstName} ${sender.lastName}`,
//         designation: sender.designation || "Officer",
//         station: sender.station || "HQ"
//       },
//       receiver: {
//         type: receiverType,
//         targetId,
//         targetName
//       },
//       docType,
//       subject,
//       body,
//       signatureUrl
//     });

//     // --- 4. Send Email Notification ---
//     if (receiverEmail) {
//         try {
//             await sendNoticeAlert(receiverEmail, targetName, notice.sender, docType);
//         } catch (emailError) {
//             console.error("Email Sending Failed:", emailError.message);
//         }
//     }

//     res.status(201).json(notice);

//   } catch (error) {
//     console.error("Send Notice Error:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };

// // ==========================================
// // 2. GET INBOX (For Citizens & Officers)
// // ==========================================
// const getMyNotices = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const userStation = req.user.station;

//     // Fetch notices targeted at the specific user OR their station
//     const notices = await Notice.find({
//       $or: [
//         { "receiver.targetId": userId.toString() }, // Direct Match
//         { "receiver.type": "station", "receiver.targetId": userStation } // Station Match
//       ]
//     }).sort({ createdAt: -1 });

//     res.json(notices);
//   } catch (error) {
//     console.error("Fetch Inbox Error:", error);
//     res.status(500).json({ message: "Fetch Failed" });
//   }
// };

// // ==========================================
// // 3. GET SENT NOTICES (For Police/Senior)
// // ==========================================
// const getSentNotices = async (req, res) => {
//   try {
//     const notices = await Notice.find({ "sender.id": req.user._id }).sort({ createdAt: -1 });
//     res.json(notices);
//   } catch (error) {
//     console.error("Fetch Sent Error:", error);
//     res.status(500).json({ message: "Fetch Failed" });
//   }
// };

// // ==========================================
// // 4. SEARCH RECEIVERS (Users OR Stations)
// // ==========================================
// const searchReceivers = async (req, res) => {
//     try {
//         const { role, query } = req.query; // role: citizen/police/station
//         if (!query && !role) return res.json([]); 

//         // ✅ MERGE: Station Search Logic
//         if (role === 'station') {
//             const stations = await Station.find({
//                 name: { $regex: query, $options: 'i' }
//             }).select('name district city location').limit(20);
            
//             return res.json(stations);
//         }

//         // ✅ MERGE: User Search Logic (Include Seniors in Police Search)
//         let roleCriteria = role;
//         if (role === 'police') {
//             roleCriteria = { $in: ['police', 'senior'] };
//         }

//         const searchCriteria = { role: roleCriteria };
        
//         if (query) {
//             searchCriteria.$or = [
//                 { firstName: { $regex: query, $options: 'i' } },
//                 { lastName: { $regex: query, $options: 'i' } },
//                 { email: { $regex: query, $options: 'i' } },
//                 { station: { $regex: query, $options: 'i' } } 
//             ];
//         }

//         // ✅ MERGE: Select All Necessary Fields for UI/PDF (Gender, ID Photo, Aadhar)
//         const users = await User.find(searchCriteria)
//             .select('firstName lastName title email station designation role gender aadhar idPhoto')
//             .limit(20); 
            
//         res.json(users);
//     } catch (error) {
//         console.error("Search Error:", error);
//         res.status(500).json({ message: "Search Failed" });
//     }
// };

// module.exports = { sendNotice, getMyNotices, getSentNotices, searchReceivers };











const Notice = require('../models/Notice');
const User = require('../models/User');
const Station = require('../models/Station');
const { uploadToCloudinary } = require('../utils/cloudinary');
const { sendNoticeAlert } = require('../utils/emailService'); 
const mongoose = require('mongoose');

// ==========================================
// 1. SEND NOTICE (With Auto-Email Loop)
// ==========================================
const sendNotice = async (req, res) => {
  try {
    const { receiverType, targetId, subject, body, docType } = req.body;
    const sender = req.user; 

    // --- 1. Handle Signature Upload ---
    let signatureUrl = null;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      signatureUrl = result.secure_url;
    }

    // --- 2. Determine Receiver & Email List ---
    let targetName = "Unknown";
    let emailRecipients = []; // Array to hold { email, name } objects

    if (receiverType === 'station') {
      // ✅ CASE: POLICE STATION (Bulk Email)
      targetName = targetId; // targetId is the Station Name here
      
      // Find ALL officers (police/senior) in this station
      const officers = await User.find({
          station: targetId,
          role: { $in: ['police', 'senior'] },
          email: { $exists: true, $ne: '' } // Ensure email exists
      });

      // Add all officers to email list
      if (officers.length > 0) {
          emailRecipients = officers.map(o => ({
              email: o.email,
              name: `${o.title} ${o.firstName} ${o.lastName}`
          }));
      }

    } else {
      // ✅ CASE: INDIVIDUAL (Citizen/Officer)
      if (!mongoose.Types.ObjectId.isValid(targetId)) {
        return res.status(400).json({ message: "Invalid Receiver ID" });
      }

      const targetUser = await User.findById(targetId);
      if (!targetUser) return res.status(404).json({ message: "Receiver not found" });
      
      targetName = `${targetUser.title} ${targetUser.firstName} ${targetUser.lastName}`;
      
      if (targetUser.email) {
          emailRecipients.push({ 
              email: targetUser.email, 
              name: targetName 
          });
      }
    }

    // --- 3. Create Notice Entry ---
    const notice = await Notice.create({
      sender: {
        id: sender._id,
        name: `${sender.title} ${sender.firstName} ${sender.lastName}`,
        designation: sender.designation || "Officer",
        station: sender.station || "HQ"
      },
      receiver: {
        type: receiverType,
        targetId,
        targetName
      },
      docType,
      subject,
      body,
      signatureUrl
    });

    // --- 4. Send Emails (Loop) ---
    // Non-blocking loop (fire and forget so UI doesn't hang)
    if (emailRecipients.length > 0) {
        console.log(`📧 Sending ${docType} alerts to ${emailRecipients.length} recipients...`);
        
        emailRecipients.forEach(recipient => {
            sendNoticeAlert(recipient.email, recipient.name, notice.sender, docType)
                .catch(err => console.error(`Failed to email ${recipient.email}:`, err.message));
        });
    }

    res.status(201).json(notice);

  } catch (error) {
    console.error("Send Notice Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ==========================================
// 2. GET INBOX
// ==========================================
const getMyNotices = async (req, res) => {
  try {
    const userId = req.user._id;
    const userStation = req.user.station;

    // Fetch notices targeted at the specific user OR their station
    const notices = await Notice.find({
      $or: [
        { "receiver.targetId": userId.toString() }, // Direct Match
        { "receiver.type": "station", "receiver.targetId": userStation } // Station Match
      ]
    }).sort({ createdAt: -1 });

    res.json(notices);
  } catch (error) {
    console.error("Fetch Inbox Error:", error);
    res.status(500).json({ message: "Fetch Failed" });
  }
};

// ==========================================
// 3. GET SENT NOTICES
// ==========================================
const getSentNotices = async (req, res) => {
  try {
    const notices = await Notice.find({ "sender.id": req.user._id }).sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    console.error("Fetch Sent Error:", error);
    res.status(500).json({ message: "Fetch Failed" });
  }
};

// ==========================================
// 4. SEARCH RECEIVERS
// ==========================================
const searchReceivers = async (req, res) => {
    try {
        const { role, query } = req.query; 
        if (!query && !role) return res.json([]); 

        // 1. Station Search
        if (role === 'station') {
            const stations = await Station.find({
                name: { $regex: query, $options: 'i' }
            }).select('name district city location').limit(20);
            return res.json(stations);
        }

        // 2. User Search (Include Seniors for Police Search)
        let roleCriteria = role;
        if (role === 'police') {
            roleCriteria = { $in: ['police', 'senior'] };
        }

        const searchCriteria = { role: roleCriteria };
        
        if (query) {
            searchCriteria.$or = [
                { firstName: { $regex: query, $options: 'i' } },
                { lastName: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { station: { $regex: query, $options: 'i' } } 
            ];
        }

        const users = await User.find(searchCriteria)
            .select('firstName lastName title email station designation role gender aadhar idPhoto')
            .limit(20); 
            
        res.json(users);
    } catch (error) {
        console.error("Search Error:", error);
        res.status(500).json({ message: "Search Failed" });
    }
};

module.exports = { sendNotice, getMyNotices, getSentNotices, searchReceivers };