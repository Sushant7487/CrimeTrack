
const DirectMessage = require('../models/DirectMessage');
const User = require('../models/User');

// Note: We don't need the manual cloudinary helper anymore 
// because 'uploadMiddleware' handles the upload automatically.

// ==========================================
// 1. SEND MESSAGE (Text or Media)
// ==========================================
const sendMessage = async (req, res) => {
  try {
    const { recipientId, message, fileType } = req.body;
    const senderId = req.user._id;

    let attachmentUrl = null;
    let finalFileType = fileType || 'text';

    // ✅ FIX: Multer already uploaded the file. 
    // We just need to get the URL from 'req.file.path'.
    if (req.file) {
      attachmentUrl = req.file.path; // Cloudinary URL is already here
      
      // Auto-detect file type if not provided by frontend
      if (!fileType) {
          const mime = req.file.mimetype;
          if (mime.startsWith('image')) finalFileType = 'image';
          else if (mime.startsWith('video')) finalFileType = 'video';
          else if (mime.startsWith('audio')) finalFileType = 'audio';
          else if (mime === 'application/pdf') finalFileType = 'pdf';
          else finalFileType = 'file';
      }
    }

    const newMessage = await DirectMessage.create({
      senderId,
      recipientId,
      message,
      attachment: attachmentUrl,
      fileType: finalFileType,
      status: 'sent',
      timestamp: new Date()
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Send Error:", error);
    res.status(500).json({ message: "Message sending failed" });
  }
};

// ==========================================
// 2. GET MESSAGE HISTORY
// ==========================================
const getMessages = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const myId = req.user._id;

    const messages = await DirectMessage.find({
      $or: [
        { senderId: myId, recipientId: partnerId },
        { senderId: partnerId, recipientId: myId },
      ],
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

// ==========================================
// 3. GET RECENT CHATS (Filtered by Role)
// ==========================================
const getRecentChats = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const { role } = req.query; 

    const chats = await DirectMessage.aggregate([
      {
        $match: {
          $or: [
            { senderId: currentUserId },
            { recipientId: currentUserId }
          ]
        }
      },
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", currentUserId] },
              "$recipientId", 
              "$senderId"     
            ]
          },
          lastMessage: { $first: "$$ROOT" }, 
          unreadCount: {
            $sum: {
              $cond: [
                { 
                  $and: [
                    { $ne: ["$senderId", currentUserId] }, 
                    { $ne: ["$status", "seen"] }           
                  ] 
                },
                1, 
                0
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "partnerDetails"
        }
      },
      { $unwind: "$partnerDetails" },
      
      // Filter by role if provided
      ...(role ? [{ $match: { "partnerDetails.role": role } }] : []),

      {
        $project: {
          partner: {
            _id: "$partnerDetails._id",
            firstName: "$partnerDetails.firstName",
            lastName: "$partnerDetails.lastName",
            designation: "$partnerDetails.designation", 
            station: "$partnerDetails.station",         
            idPhoto: "$partnerDetails.idPhoto",
            isOnline: "$partnerDetails.isOnline",
            role: "$partnerDetails.role"                
          },
          lastMessage: {
            message: "$lastMessage.message",
            fileType: "$lastMessage.fileType",
            timestamp: "$lastMessage.timestamp",
            status: "$lastMessage.status"
          },
          unreadCount: 1,
          time: "$lastMessage.timestamp"
        }
      },
      { $sort: { time: -1 } }
    ]);

    res.json(chats);

  } catch (error) {
    console.error("Error fetching recent chats:", error);
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};

module.exports = { sendMessage, getMessages, getRecentChats };