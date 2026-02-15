// const HelpTicket = require('../models/HelpTicket');
// const Feedback = require('../models/Feedback');
// const User = require('../models/User'); // To get user details
// const { uploadToCloudinary } = require('../utils/cloudinary');
// const { 
//   sendHelpTicketAck, 
//   sendAdminReplyEmail, 
//   sendFeedbackThankYou 
// } = require('../utils/emailService');

// // =======================
// // 1. HELP SECTION
// // =======================

// // A. User creates a help ticket
// const createHelpTicket = async (req, res) => {
//   try {
//     const { message, subject } = req.body;
//     let screenshotUrl = null;

//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       screenshotUrl = result.secure_url;
//     }

//     const ticket = await HelpTicket.create({
//       user: req.user._id,
//       subject: subject || "General Help",
//       message,
//       screenshot: screenshotUrl
//     });

//     // Send Acknowledgement Email
//     if (req.user.email) {
//       sendHelpTicketAck(req.user.email, req.user.firstName, ticket._id)
//         .catch(err => console.error("Email Fail:", err));
//     }

//     res.status(201).json(ticket);
//   } catch (error) {
//     console.error("Help Ticket Error:", error);
//     res.status(500).json({ message: "Failed to submit ticket" });
//   }
// };

// // B. User gets their own tickets
// const getMyTickets = async (req, res) => {
//   try {
//     const tickets = await HelpTicket.find({ user: req.user._id }).sort({ createdAt: -1 });
//     res.json(tickets);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching tickets" });
//   }
// };

// // C. Admin gets ALL tickets
// const getAllTickets = async (req, res) => {
//   try {
//     const tickets = await HelpTicket.find()
//       .populate('user', 'firstName lastName email role idPhoto')
//       .sort({ createdAt: -1 });
//     res.json(tickets);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching tickets" });
//   }
// };

// // D. Admin replies to a ticket
// const replyToTicket = async (req, res) => {
//   try {
//     const { ticketId } = req.params;
//     const { replyMessage } = req.body;

//     const ticket = await HelpTicket.findById(ticketId).populate('user');
//     if (!ticket) return res.status(404).json({ message: "Ticket not found" });

//     ticket.adminReply = replyMessage;
//     ticket.status = 'Resolved'; // Auto-mark resolved on reply
//     ticket.adminRepliedAt = new Date();
//     await ticket.save();

//     // Send Email to User
//     if (ticket.user && ticket.user.email) {
//       sendAdminReplyEmail(ticket.user.email, ticket.user.firstName, ticket._id, replyMessage)
//         .catch(err => console.error("Email Fail:", err));
//     }

//     res.json(ticket);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to send reply" });
//   }
// };

// // =======================
// // 2. REVIEW & SUGGESTIONS
// // =======================

// // A. Submit Review or Suggestion
// const submitFeedback = async (req, res) => {
//   try {
//     const { type, rating, comment } = req.body; // type must be 'Review' or 'Suggestion'

//     if (type === 'Review' && !rating) {
//       return res.status(400).json({ message: "Rating is required for reviews" });
//     }

//     const feedback = await Feedback.create({
//       user: req.user._id,
//       type,
//       rating: type === 'Review' ? rating : undefined,
//       comment
//     });

//     // Send Thank You Email
//     if (req.user.email) {
//       sendFeedbackThankYou(req.user.email, req.user.firstName, type)
//         .catch(err => console.error("Email Fail:", err));
//     }

//     res.status(201).json({ message: `${type} submitted successfully!` });
//   } catch (error) {
//     console.error("Feedback Error:", error);
//     res.status(500).json({ message: "Failed to submit feedback" });
//   }
// };

// // B. Admin gets all Feedback
// const getAllFeedback = async (req, res) => {
//   try {
//     const { type } = req.query; // ?type=Review OR ?type=Suggestion
//     const query = type ? { type } : {};
    
//     const feedbacks = await Feedback.find(query)
//       .populate('user', 'firstName lastName email role')
//       .sort({ createdAt: -1 });
      
//     res.json(feedbacks);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching feedback" });
//   }
// };

// module.exports = {
//   createHelpTicket,
//   getMyTickets,
//   getAllTickets,
//   replyToTicket,
//   submitFeedback,
//   getAllFeedback
// };


















const HelpTicket = require('../models/HelpTicket');
const Feedback = require('../models/Feedback');
const FAQ = require('../models/FAQ'); // ✅ Import FAQ Model
const User = require('../models/User'); // To get user details
const { uploadToCloudinary } = require('../utils/cloudinary');
const { 
  sendHelpTicketAck, 
  sendAdminReplyEmail, 
  sendFeedbackThankYou 
} = require('../utils/emailService');

// =======================
// 1. HELP SECTION
// =======================

// A. User creates a help ticket
const createHelpTicket = async (req, res) => {
  try {
    const { message, subject } = req.body;
    let screenshotUrl = null;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      screenshotUrl = result.secure_url;
    }

    const ticket = await HelpTicket.create({
      user: req.user._id,
      subject: subject || "General Help",
      message,
      screenshot: screenshotUrl
    });

    // Send Acknowledgement Email
    if (req.user.email) {
      sendHelpTicketAck(req.user.email, req.user.firstName, ticket._id)
        .catch(err => console.error("Email Fail:", err));
    }

    res.status(201).json(ticket);
  } catch (error) {
    console.error("Help Ticket Error:", error);
    res.status(500).json({ message: "Failed to submit ticket" });
  }
};

// B. User gets their own tickets
const getMyTickets = async (req, res) => {
  try {
    const tickets = await HelpTicket.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets" });
  }
};

// C. Admin gets ALL tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await HelpTicket.find()
      .populate('user', 'firstName lastName email role idPhoto')
      .sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tickets" });
  }
};

// D. Admin replies to a ticket
const replyToTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { replyMessage } = req.body;

    const ticket = await HelpTicket.findById(ticketId).populate('user');
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.adminReply = replyMessage;
    ticket.status = 'Resolved'; // Auto-mark resolved on reply
    ticket.adminRepliedAt = new Date();
    await ticket.save();

    // Send Email to User
    if (ticket.user && ticket.user.email) {
      sendAdminReplyEmail(ticket.user.email, ticket.user.firstName, ticket._id, replyMessage)
        .catch(err => console.error("Email Fail:", err));
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Failed to send reply" });
  }
};

// ✅ NEW FUNCTION: Promote a Resolved Ticket to Public FAQ
const promoteToFAQ = async (req, res) => {
  try {
    const { ticketId } = req.params;

    // 1. Find the ticket
    const ticket = await HelpTicket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // 2. Validation
    if (!ticket.adminReply) {
      return res.status(400).json({ message: "Cannot promote: Ticket has no admin reply." });
    }

    // 3. Create new FAQ
    // We use the User's Message as the "Question" and Admin's Reply as the "Answer"
    const newFAQ = await FAQ.create({
      question: ticket.message, // Or ticket.subject if you prefer short headers
      answer: ticket.adminReply
    });

    res.status(201).json({ message: "Successfully added to Home Page FAQs!", faq: newFAQ });

  } catch (error) {
    console.error("Promote FAQ Error:", error);
    res.status(500).json({ message: "Failed to promote to FAQ" });
  }
};

// =======================
// 2. REVIEW & SUGGESTIONS
// =======================

// A. Submit Review or Suggestion
const submitFeedback = async (req, res) => {
  try {
    const { type, rating, comment } = req.body; // type must be 'Review' or 'Suggestion'

    if (type === 'Review' && !rating) {
      return res.status(400).json({ message: "Rating is required for reviews" });
    }

    const feedback = await Feedback.create({
      user: req.user._id,
      type,
      rating: type === 'Review' ? rating : undefined,
      comment
    });

    // Send Thank You Email
    if (req.user.email) {
      sendFeedbackThankYou(req.user.email, req.user.firstName, type)
        .catch(err => console.error("Email Fail:", err));
    }

    res.status(201).json({ message: `${type} submitted successfully!` });
  } catch (error) {
    console.error("Feedback Error:", error);
    res.status(500).json({ message: "Failed to submit feedback" });
  }
};

// B. Admin gets all Feedback
const getAllFeedback = async (req, res) => {
  try {
    const { type } = req.query; // ?type=Review OR ?type=Suggestion
    const query = type ? { type } : {};
    
    const feedbacks = await Feedback.find(query)
      .populate('user', 'firstName lastName email role')
      .sort({ createdAt: -1 });
      
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching feedback" });
  }
};

module.exports = {
  createHelpTicket,
  getMyTickets,
  getAllTickets,
  replyToTicket,
  submitFeedback,
  getAllFeedback,
  promoteToFAQ // ✅ Export New Function
};