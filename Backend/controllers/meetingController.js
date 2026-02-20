// const Meeting = require('../models/Meeting');
// const User = require('../models/User'); 
// const { sendMeetingInvite } = require('../utils/emailService'); 
// const { v4: uuidv4 } = require('uuid');

// // 1. Schedule Meeting
// const scheduleMeeting = async (req, res) => {
//   try {
//     const { title, startTime, endTime, participants, meetingType } = req.body;

//     if (!title || !startTime || !endTime || !participants || participants.length === 0) {
//       return res.status(400).json({ message: "Please fill all fields and select at least one participant." });
//     }

//     const roomName = `Case-${uuidv4().slice(0, 8)}`;

//     const meeting = new Meeting({
//       title, startTime, endTime, roomName,
//       host: req.user._id, 
//       participants,        
//       meetingType: meetingType || 'Citizen'
//     });


// // Passing meetingType as the 4th argument

//     const savedMeeting = await meeting.save();

//     try {
//       const usersToNotify = await User.find({ _id: { $in: participants } });
//       usersToNotify.forEach(user => {
//         sendMeetingInvite(user.email, user.firstName, { title: title, scheduledTime: startTime })
//           .catch(err => console.error(`❌ Mail Failed for ${user.email}:`, err.message));
//       });
//     } catch (emailErr) { console.error("Email Logic Error", emailErr); }

//     res.status(201).json(savedMeeting);

//   } catch (error) {
//     console.error("Schedule Error:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // 2. Get My Meetings
// const getMyMeetings = async (req, res) => {
//   try {
//     const meetings = await Meeting.find({
//       $or: [
//         { host: req.user._id },
//         { participants: { $in: [req.user._id] } } 
//       ]
//     })
//     .populate('host', 'firstName lastName designation station')
//     .populate('participants', 'firstName lastName role designation')
//     .sort({ startTime: 1 });

//     res.json(meetings);
//   } catch (error) {
//     console.error("Get Meetings Error:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // 3. ✅ NEW: Fetch Users for Meeting Dropdown
// const getUsersForMeeting = async (req, res) => {
//     try {
//         const { role } = req.query; // 'police' or 'citizen'
        
//         let query = {};
        
//         // If role contains comma (e.g., "police,senior"), split it
//         if (role && role.includes(',')) {
//             const roles = role.split(',');
//             query = { role: { $in: roles } };
//         } else if (role) {
//             query = { role: role };
//         }

//         // Exclude current user from list
//         query._id = { $ne: req.user._id };

//         const users = await User.find(query)
//             .select('firstName lastName email role designation station idPhoto')
//             .limit(50); // Limit to avoid overload

//         res.json(users);
//     } catch (error) {
//         console.error("Fetch Users Error:", error.message);
//         res.status(500).json({ message: "Fetch Failed" });
//     }
// };

// module.exports = { scheduleMeeting, getMyMeetings, getUsersForMeeting };

















const Meeting = require('../models/Meeting');
const User = require('../models/User'); 
const { sendMeetingInvite } = require('../utils/emailService'); 
const { v4: uuidv4 } = require('uuid');

// 1. Schedule Meeting
const scheduleMeeting = async (req, res) => {
  try {
    const { title, startTime, endTime, participants, meetingType } = req.body;

    if (!title || !startTime || !endTime || !participants || participants.length === 0) {
      return res.status(400).json({ message: "Please fill all fields and select at least one participant." });
    }

    const roomName = `Case-${uuidv4().slice(0, 8)}`;

    const meeting = new Meeting({
      title, startTime, endTime, roomName,
      host: req.user._id, 
      participants,        
      meetingType: meetingType || 'Citizen'
    });

    const savedMeeting = await meeting.save();

    try {
      const usersToNotify = await User.find({ _id: { $in: participants } });
      usersToNotify.forEach(user => {
        // ✅ Passing meetingType as the 4th argument
        sendMeetingInvite(user.email, user.firstName, { title: title, scheduledTime: startTime }, meetingType || 'Citizen')
          .catch(err => console.error(`❌ Mail Failed for ${user.email}:`, err.message));
      });
    } catch (emailErr) { console.error("Email Logic Error", emailErr); }

    res.status(201).json(savedMeeting);

  } catch (error) {
    console.error("Schedule Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// 2. Get My Meetings
const getMyMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({
      $or: [
        { host: req.user._id },
        { participants: { $in: [req.user._id] } } 
      ]
    })
    .populate('host', 'firstName lastName designation station')
    .populate('participants', 'firstName lastName role designation')
    .sort({ startTime: 1 });

    res.json(meetings);
  } catch (error) {
    console.error("Get Meetings Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// 3. ✅ NEW: Fetch Users for Meeting Dropdown
const getUsersForMeeting = async (req, res) => {
    try {
        const { role } = req.query; // 'police' or 'citizen'
        
        let query = {};
        
        // If role contains comma (e.g., "police,senior"), split it
        if (role && role.includes(',')) {
            const roles = role.split(',');
            query = { role: { $in: roles } };
        } else if (role) {
            query = { role: role };
        }

        // Exclude current user from list
        query._id = { $ne: req.user._id };

        const users = await User.find(query)
            .select('firstName lastName email role designation station idPhoto')
            .limit(50); // Limit to avoid overload

        res.json(users);
    } catch (error) {
        console.error("Fetch Users Error:", error.message);
        res.status(500).json({ message: "Fetch Failed" });
    }
};

module.exports = { scheduleMeeting, getMyMeetings, getUsersForMeeting };