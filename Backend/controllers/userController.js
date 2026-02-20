
// const User = require('../models/User');
// const Otp = require('../models/Otp');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const { uploadToCloudinary } = require('../utils/cloudinary'); // Helper

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// /* =======================
//     📧 EMAIL SENDER (BREVO)
// ======================= */
// const sendEmail = async (to, subject, html) => {
//   try {
//     await axios.post(
//       'https://api.brevo.com/v3/smtp/email',
//       {
//         sender: { email: process.env.EMAIL_FROM, name: 'CrimeTrack Security' },
//         to: [{ email: to }],
//         subject,
//         htmlContent: html,
//       },
//       {
//         headers: {
//           'api-key': process.env.BREVO_API_KEY,
//           'Content-Type': 'application/json',
//           'Accept': 'application/json', // ✅ ADDED: Required for Brevo API stability
//         },
//       }
//     );
//   } catch (error) {
//     // ✅ ADDED: Log specific Brevo error to your terminal for debugging
//     console.error("Brevo API Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// /* =======================
//     🔐 SEND OTP
// ======================= */
// const sendOtp = async (req, res) => {
//   const { email, type } = req.body;
//   if (!email) return res.status(400).json({ message: "Email is required" });

//   try {
//     const userExists = await User.findOne({ email });
//     if (type === 'signup' && userExists) return res.status(400).json({ message: "User already exists" });
//     if (type === 'forgot' && !userExists) return res.status(404).json({ message: "User not found" });

//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     await Otp.deleteMany({ email });
//     await Otp.create({ email, otp: otpCode });

//     await sendEmail(email, 'Your OTP - CrimeTrack', `<h1>${otpCode}</h1>`);
//     res.json({ message: "OTP sent successfully" });
//   } catch (error) {
//     // ✅ ADDED: Log the error so you know if it's an API Key or Network issue
//     console.error("OTP Route Error:", error.message);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// /* =======================
//     📝 REGISTER USER
// ======================= */
// const registerUser = async (req, res) => {
//   try {
//     const { role, title, firstName, lastName, email, password, mobile, gender, station, designation, secretCode, aadhar, otp } = req.body;

//     const otpRecord = await Otp.findOne({ email, otp });
//     if (!otpRecord) return res.status(400).json({ message: "Invalid or Expired OTP" });

//     if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Invalid Police Secret Code" });
//     if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Invalid High Command Code" });

//     if (!/^[0-9]{10}$/.test(mobile)) return res.status(400).json({ message: "Invalid Mobile Number" });
//     if (aadhar && !/^[0-9]{12}$/.test(aadhar)) return res.status(400).json({ message: "Invalid Aadhaar Number" });

//     let idPhotoUrl = "";
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       idPhotoUrl = result.secure_url;
//     } else {
//       return res.status(400).json({ message: "ID Photo upload is required." });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       role, title, firstName, lastName, email, password: hashedPassword, mobile, gender, aadhar, 
//       idPhoto: idPhotoUrl, station, designation
//     });

//     await Otp.deleteMany({ email });

//     res.status(201).json({
//       _id: user._id,
//       name: `${user.title} ${user.firstName} ${user.lastName}`,
//       email: user.email,
//       role: user.role,
//       idPhoto: user.idPhoto,
//       station: user.station,
//       designation: user.designation,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* =======================
//     🔑 LOGIN USER
// ======================= */
// const loginUser = async (req, res) => {
//   const { email, password, role, secretCode } = req.body;
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Invalid Credentials" });
//   }
//   if (user.role !== role) return res.status(401).json({ message: "Role Mismatch" });

//   if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Wrong Secret Code" });
//   if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Wrong High Command Code" });

//   // ✅ Update Online Status on Login
//   await User.findByIdAndUpdate(user._id, { isOnline: true });

//   res.json({
//     _id: user._id,
//     name: `${user.title} ${user.firstName} ${user.lastName}`,
//     email: user.email,
//     role: user.role,
//     idPhoto: user.idPhoto,
//     station: user.station,
//     designation: user.designation,
//     token: generateToken(user._id),
//   });
// };

// /* =======================
//     🔄 RESET PASSWORD
// ======================= */
// const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   const otpRecord = await Otp.findOne({ email, otp });
//   if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(newPassword, salt);
//   await User.findOneAndUpdate({ email }, { password: hashedPassword });
//   await Otp.deleteMany({ email });

//   res.json({ message: "Password reset successful" });
// };

// /* =======================
//     📋 GET ALL USERS
// ======================= */
// const getAllUsers = async (req, res) => {
//   try {
//     const { role } = req.query;
//     const query = {};
//     if (role) {
//       query.role = role;
//     }
//     const users = await User.find(query).select('-password');
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* =======================
//     👮 OTHER CONTROLLERS
// ======================= */
// const getAllOfficers = async (req, res) => {
//   const officers = await User.find({ role: { $in: ['police', 'senior'] } }).select('-password');
//   res.json(officers);
// };

// const getUserById = async (req, res) => {
//   try {
//     if (!req.params.id || req.params.id === "undefined" || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//         return res.status(404).json({ message: "Invalid User ID" });
//     }
//     const user = await User.findById(req.params.id).select("-password");
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error in getUserById:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const deleteUser = async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// };

// const transferOfficer = async (req, res) => {
//   const { newStation } = req.body;
//   await User.findByIdAndUpdate(req.params.id, { station: newStation });
//   res.json({ message: `Transferred to ${newStation}` });
// };

// module.exports = {
//   sendOtp,
//   registerUser,
//   loginUser,
//   resetPassword,
//   getAllUsers,
//   getAllOfficers,
//   getUserById, 
//   deleteUser,
//   transferOfficer,
// };





























// Changes Started for Email



// const User = require('../models/User');
// const Otp = require('../models/Otp');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const { uploadToCloudinary } = require('../utils/cloudinary'); // Helper
// // ✅ IMPORT EMAIL SERVICE (Brevo Based)
// const { sendWelcomeEmail } = require('../utils/emailService');

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// /* =======================
//     📧 EMAIL SENDER (BREVO) - Kept Local for OTP flow
// ======================= */
// const sendEmail = async (to, subject, html) => {
//   try {
//     await axios.post(
//       'https://api.brevo.com/v3/smtp/email',
//       {
//         sender: { email: process.env.EMAIL_FROM, name: 'CrimeTrack Security' },
//         to: [{ email: to }],
//         subject,
//         htmlContent: html,
//       },
//       {
//         headers: {
//           'api-key': process.env.BREVO_API_KEY,
//           'Content-Type': 'application/json',
//           'Accept': 'application/json', 
//         },
//       }
//     );
//   } catch (error) {
//     console.error("Brevo API Error:", error.response?.data || error.message);
//     throw error;
//   }
// };

// /* =======================
//     🔐 SEND OTP
// ======================= */
// const sendOtp = async (req, res) => {
//   const { email, type } = req.body;
//   if (!email) return res.status(400).json({ message: "Email is required" });

//   try {
//     const userExists = await User.findOne({ email });
//     if (type === 'signup' && userExists) return res.status(400).json({ message: "User already exists" });
//     if (type === 'forgot' && !userExists) return res.status(404).json({ message: "User not found" });

//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     await Otp.deleteMany({ email });
//     await Otp.create({ email, otp: otpCode });

//     await sendEmail(email, 'Your OTP - CrimeTrack', `<h1>${otpCode}</h1>`);
//     res.json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("OTP Route Error:", error.message);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// /* =======================
//     📝 REGISTER USER
// ======================= */
// const registerUser = async (req, res) => {
//   try {
//     const { role, title, firstName, lastName, email, password, mobile, gender, station, designation, secretCode, aadhar, otp } = req.body;

//     const otpRecord = await Otp.findOne({ email, otp });
//     if (!otpRecord) return res.status(400).json({ message: "Invalid or Expired OTP" });

//     if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Invalid Police Secret Code" });
//     if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Invalid High Command Code" });

//     if (!/^[0-9]{10}$/.test(mobile)) return res.status(400).json({ message: "Invalid Mobile Number" });
//     if (aadhar && !/^[0-9]{12}$/.test(aadhar)) return res.status(400).json({ message: "Invalid Aadhaar Number" });

//     let idPhotoUrl = "";
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       idPhotoUrl = result.secure_url;
//     } else {
//       return res.status(400).json({ message: "ID Photo upload is required." });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       role, title, firstName, lastName, email, password: hashedPassword, mobile, gender, aadhar, 
//       idPhoto: idPhotoUrl, station, designation
//     });

//     await Otp.deleteMany({ email });

//     // ✅ NEW: SEND WELCOME EMAIL (Uses Brevo via emailService.js)
//     const fullName = `${title} ${firstName} ${lastName}`;
//     // Don't await this, let it run in background so response is fast
//     sendWelcomeEmail(email, fullName, password).catch(err => console.error("Welcome Email Failed", err.message));

//     res.status(201).json({
//       _id: user._id,
//       name: fullName,
//       email: user.email,
//       role: user.role,
//       idPhoto: user.idPhoto,
//       station: user.station,
//       designation: user.designation,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* =======================
//     🔑 LOGIN USER
// ======================= */
// const loginUser = async (req, res) => {
//   const { email, password, role, secretCode } = req.body;
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Invalid Credentials" });
//   }
//   if (user.role !== role) return res.status(401).json({ message: "Role Mismatch" });

//   if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Wrong Secret Code" });
//   if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Wrong High Command Code" });

//   // ✅ Update Online Status on Login
//   await User.findByIdAndUpdate(user._id, { isOnline: true });

//   res.json({
//     _id: user._id,
//     name: `${user.title} ${user.firstName} ${user.lastName}`,
//     email: user.email,
//     role: user.role,
//     idPhoto: user.idPhoto,
//     station: user.station,
//     designation: user.designation,
//     token: generateToken(user._id),
//   });
// };

// /* =======================
//     🔄 RESET PASSWORD
// ======================= */
// const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   const otpRecord = await Otp.findOne({ email, otp });
//   if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(newPassword, salt);
//   await User.findOneAndUpdate({ email }, { password: hashedPassword });
//   await Otp.deleteMany({ email });

//   res.json({ message: "Password reset successful" });
// };

// /* =======================
//     📋 GET ALL USERS
// ======================= */
// const getAllUsers = async (req, res) => {
//   try {
//     const { role } = req.query;
//     const query = {};
//     if (role) {
//       query.role = role;
//     }
//     const users = await User.find(query).select('-password');
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* =======================
//     👮 OTHER CONTROLLERS
// ======================= */
// const getAllOfficers = async (req, res) => {
//   const officers = await User.find({ role: { $in: ['police', 'senior'] } }).select('-password');
//   res.json(officers);
// };

// const getUserById = async (req, res) => {
//   try {
//     if (!req.params.id || req.params.id === "undefined" || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//         return res.status(404).json({ message: "Invalid User ID" });
//     }
//     const user = await User.findById(req.params.id).select("-password");
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error in getUserById:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const deleteUser = async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// };

// const transferOfficer = async (req, res) => {
//   const { newStation } = req.body;
//   await User.findByIdAndUpdate(req.params.id, { station: newStation });
//   res.json({ message: `Transferred to ${newStation}` });
// };

// module.exports = {
//   sendOtp,
//   registerUser,
//   loginUser,
//   resetPassword,
//   getAllUsers,
//   getAllOfficers,
//   getUserById, 
//   deleteUser,
//   transferOfficer,
// };















// const User = require('../models/User');
// const Otp = require('../models/Otp');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const { uploadToCloudinary } = require('../utils/cloudinary'); // Helper

// // ✅ IMPORT EMAIL SERVICE (Now includes OTP & Welcome logic)
// const { sendWelcomeEmail, sendOtpEmail } = require('../utils/emailService');

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// /* =======================
//     🔐 SEND OTP
// ======================= */
// const sendOtp = async (req, res) => {
//   const { email, type } = req.body;
//   if (!email) return res.status(400).json({ message: "Email is required" });

//   try {
//     const userExists = await User.findOne({ email });
//     if (type === 'signup' && userExists) return res.status(400).json({ message: "User already exists" });
//     if (type === 'forgot' && !userExists) return res.status(404).json({ message: "User not found" });

//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     await Otp.deleteMany({ email });
//     await Otp.create({ email, otp: otpCode });

//     // ✅ NEW: Uses the formatted email with Logo
//     await sendOtpEmail(email, otpCode);
    
//     res.json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("OTP Route Error:", error.message);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// /* =======================
//     📝 REGISTER USER
// ======================= */
// const registerUser = async (req, res) => {
//   try {
//     const { role, title, firstName, lastName, email, password, mobile, gender, station, designation, secretCode, aadhar, otp } = req.body;

//     const otpRecord = await Otp.findOne({ email, otp });
//     if (!otpRecord) return res.status(400).json({ message: "Invalid or Expired OTP" });

//     if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Invalid Police Secret Code" });
//     if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Invalid High Command Code" });

//     if (!/^[0-9]{10}$/.test(mobile)) return res.status(400).json({ message: "Invalid Mobile Number" });
//     if (aadhar && !/^[0-9]{12}$/.test(aadhar)) return res.status(400).json({ message: "Invalid Aadhaar Number" });

//     let idPhotoUrl = "";
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       idPhotoUrl = result.secure_url;
//     } else {
//       return res.status(400).json({ message: "ID Photo upload is required." });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       role, title, firstName, lastName, email, password: hashedPassword, mobile, gender, aadhar, 
//       idPhoto: idPhotoUrl, station, designation
//     });

//     await Otp.deleteMany({ email });

//     // ✅ NEW: Send Welcome Email (Formatted)
//     const fullName = `${title} ${firstName} ${lastName}`;
//     sendWelcomeEmail(email, fullName, password).catch(err => console.error("Welcome Email Failed", err.message));

//     res.status(201).json({
//       _id: user._id,
//       name: fullName,
//       email: user.email,
//       role: user.role,
//       idPhoto: user.idPhoto,
//       station: user.station,
//       designation: user.designation,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* =======================
//     🔑 LOGIN USER
// ======================= */
// const loginUser = async (req, res) => {
//   const { email, password, role, secretCode } = req.body;
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Invalid Credentials" });
//   }
//   if (user.role !== role) return res.status(401).json({ message: "Role Mismatch" });

//   if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Wrong Secret Code" });
//   if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Wrong High Command Code" });

//   // ✅ Update Online Status on Login
//   await User.findByIdAndUpdate(user._id, { isOnline: true });

//   res.json({
//     _id: user._id,
//     name: `${user.title} ${user.firstName} ${user.lastName}`,
//     email: user.email,
//     role: user.role,
//     idPhoto: user.idPhoto,
//     station: user.station,
//     designation: user.designation,
//     token: generateToken(user._id),
//   });
// };

// /* =======================
//     🔄 RESET PASSWORD
// ======================= */
// const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   const otpRecord = await Otp.findOne({ email, otp });
//   if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(newPassword, salt);
//   await User.findOneAndUpdate({ email }, { password: hashedPassword });
//   await Otp.deleteMany({ email });

//   res.json({ message: "Password reset successful" });
// };

// /* =======================
//     📋 GET ALL USERS
// ======================= */
// const getAllUsers = async (req, res) => {
//   try {
//     const { role } = req.query;
//     const query = {};
//     if (role) {
//       query.role = role;
//     }
//     const users = await User.find(query).select('-password');
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* =======================
//     👮 OTHER CONTROLLERS
// ======================= */
// const getAllOfficers = async (req, res) => {
//   const officers = await User.find({ role: { $in: ['police', 'senior'] } }).select('-password');
//   res.json(officers);
// };

// const getUserById = async (req, res) => {
//   try {
//     if (!req.params.id || req.params.id === "undefined" || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//         return res.status(404).json({ message: "Invalid User ID" });
//     }
//     const user = await User.findById(req.params.id).select("-password");
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error in getUserById:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const deleteUser = async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// };

// const transferOfficer = async (req, res) => {
//   const { newStation } = req.body;
//   await User.findByIdAndUpdate(req.params.id, { station: newStation });
//   res.json({ message: `Transferred to ${newStation}` });
// };

// module.exports = {
//   sendOtp,
//   registerUser,
//   loginUser,
//   resetPassword,
//   getAllUsers,
//   getAllOfficers,
//   getUserById, 
//   deleteUser,
//   transferOfficer,
// };















































// const User = require('../models/User');
// const Otp = require('../models/Otp');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const { uploadToCloudinary } = require('../utils/cloudinary'); // Helper

// // ✅ IMPORT EMAIL SERVICE (Added sendAdminAlert & sendOtpEmail)
// const { sendWelcomeEmail, sendOtpEmail, sendAdminAlert } = require('../utils/emailService');

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// /* =======================
//     🔐 SEND OTP
// ======================= */
// const sendOtp = async (req, res) => {
//   const { email, type } = req.body;
//   if (!email) return res.status(400).json({ message: "Email is required" });

//   try {
//     const userExists = await User.findOne({ email });
//     if (type === 'signup' && userExists) return res.status(400).json({ message: "User already exists" });
//     if (type === 'forgot' && !userExists) return res.status(404).json({ message: "User not found" });

//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     await Otp.deleteMany({ email });
//     await Otp.create({ email, otp: otpCode });

//     // ✅ Uses new formatted email with Logo from emailService.js
//     await sendOtpEmail(email, otpCode);
    
//     res.json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("OTP Route Error:", error.message);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// /* =======================
//     📝 REGISTER USER
// ======================= */
// const registerUser = async (req, res) => {
//   try {
//     const { role, title, firstName, lastName, email, password, mobile, gender, station, designation, secretCode, aadhar, otp } = req.body;

//     const otpRecord = await Otp.findOne({ email, otp });
//     if (!otpRecord) return res.status(400).json({ message: "Invalid or Expired OTP" });

//     if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Invalid Police Secret Code" });
//     if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Invalid High Command Code" });

//     if (!/^[0-9]{10}$/.test(mobile)) return res.status(400).json({ message: "Invalid Mobile Number" });
//     if (aadhar && !/^[0-9]{12}$/.test(aadhar)) return res.status(400).json({ message: "Invalid Aadhaar Number" });

//     let idPhotoUrl = "";
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       idPhotoUrl = result.secure_url;
//     } else {
//       return res.status(400).json({ message: "ID Photo upload is required." });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       role, title, firstName, lastName, email, password: hashedPassword, mobile, gender, aadhar, 
//       idPhoto: idPhotoUrl, station, designation
//     });

//     await Otp.deleteMany({ email });

//     const fullName = `${title} ${firstName} ${lastName}`;

//     // ✅ 1. SEND WELCOME EMAIL TO USER
//     sendWelcomeEmail(email, fullName, password).catch(err => console.error("Welcome Email Failed", err.message));

//     // ✅ 2. SEND ADMIN ALERT (OWNER NOTIFICATION)
//     sendAdminAlert('Signup', { 
//       name: fullName, 
//       email: user.email, 
//       role: user.role, 
//       _id: user._id 
//     }).catch(e => console.error("Admin Alert Failed", e.message));

//     res.status(201).json({
//       _id: user._id,
//       name: fullName,
//       email: user.email,
//       role: user.role,
//       idPhoto: user.idPhoto,
//       station: user.station,
//       designation: user.designation,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* =======================
//     🔑 LOGIN USER
// ======================= */
// const loginUser = async (req, res) => {
//   const { email, password, role, secretCode } = req.body;
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Invalid Credentials" });
//   }
//   if (user.role !== role) return res.status(401).json({ message: "Role Mismatch" });

//   if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Wrong Secret Code" });
//   if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Wrong High Command Code" });

//   // ✅ Update Online Status on Login
//   await User.findByIdAndUpdate(user._id, { isOnline: true });

//   const fullName = `${user.title} ${user.firstName} ${user.lastName}`;

//   // ✅ SEND ADMIN ALERT (OWNER NOTIFICATION)
//   sendAdminAlert('Login', { 
//     name: fullName, 
//     email: user.email, 
//     role: user.role, 
//     _id: user._id 
//   }).catch(e => console.error("Admin Alert Failed", e.message));

//   res.json({
//     _id: user._id,
//     name: fullName,
//     email: user.email,
//     role: user.role,
//     idPhoto: user.idPhoto,
//     station: user.station,
//     designation: user.designation,
//     token: generateToken(user._id),
//   });
// };

// /* =======================
//     🚪 LOGOUT USER (NEW FUNCTIONALITY)
// ======================= */
// const logoutUser = async (req, res) => {
//   try {
//     const userId = req.body.userId || req.params.id; // Expecting userId in body or params
    
//     if (userId) {
//       const user = await User.findById(userId);
//       if (user) {
//         // Update DB: Mark Offline & Set Last Seen
//         await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: new Date() });
        
//         const fullName = `${user.title} ${user.firstName} ${user.lastName}`;
        
//         // ✅ SEND ADMIN ALERT (OWNER NOTIFICATION)
//         sendAdminAlert('Logout', { 
//           name: fullName, 
//           email: user.email, 
//           role: user.role, 
//           _id: user._id 
//         }).catch(e => console.error("Admin Alert Failed", e.message));
//       }
//     }
//     res.json({ message: "Logged out successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Logout Error" });
//   }
// };

// /* =======================
//     🔄 RESET PASSWORD
// ======================= */
// const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   const otpRecord = await Otp.findOne({ email, otp });
//   if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(newPassword, salt);
//   await User.findOneAndUpdate({ email }, { password: hashedPassword });
//   await Otp.deleteMany({ email });

//   res.json({ message: "Password reset successful" });
// };

// /* =======================
//     📋 GET ALL USERS
// ======================= */
// const getAllUsers = async (req, res) => {
//   try {
//     const { role } = req.query;
//     const query = {};
//     if (role) {
//       query.role = role;
//     }
//     const users = await User.find(query).select('-password');
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* =======================
//     👮 OTHER CONTROLLERS
// ======================= */
// const getAllOfficers = async (req, res) => {
//   const officers = await User.find({ role: { $in: ['police', 'senior'] } }).select('-password');
//   res.json(officers);
// };

// const getUserById = async (req, res) => {
//   try {
//     if (!req.params.id || req.params.id === "undefined" || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//         return res.status(404).json({ message: "Invalid User ID" });
//     }
//     const user = await User.findById(req.params.id).select("-password");
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error in getUserById:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const deleteUser = async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// };

// const transferOfficer = async (req, res) => {
//   const { newStation } = req.body;
//   await User.findByIdAndUpdate(req.params.id, { station: newStation });
//   res.json({ message: `Transferred to ${newStation}` });
// };

// module.exports = {
//   sendOtp,
//   registerUser,
//   loginUser,
//   logoutUser, // ✅ Exported new logout functionality
//   resetPassword,
//   getAllUsers,
//   getAllOfficers,
//   getUserById, 
//   deleteUser,
//   transferOfficer,
// };














// const User = require('../models/User');
// const Otp = require('../models/Otp');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const { uploadToCloudinary } = require('../utils/cloudinary'); // Helper

// // ✅ IMPORT EMAIL SERVICE (Only using the new formatted ones & Admin Alert)
// const { sendWelcomeEmail, sendOtpEmail, sendAdminAlert } = require('../utils/emailService');

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// /* =======================
//     🔐 SEND OTP
// ======================= */
// const sendOtp = async (req, res) => {
//   const { email, type } = req.body;
//   if (!email) return res.status(400).json({ message: "Email is required" });

//   try {
//     const userExists = await User.findOne({ email });
//     if (type === 'signup' && userExists) return res.status(400).json({ message: "User already exists" });
//     if (type === 'forgot' && !userExists) return res.status(404).json({ message: "User not found" });

//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     await Otp.deleteMany({ email });
//     await Otp.create({ email, otp: otpCode });

//     // ✅ Uses new formatted email (No duplicate logic here)
//     await sendOtpEmail(email, otpCode);
    
//     res.json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("OTP Route Error:", error.message);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// /* =======================
//     📝 REGISTER USER
// ======================= */
// const registerUser = async (req, res) => {
//   try {
//     const { role, title, firstName, lastName, email, password, mobile, gender, station, designation, secretCode, aadhar, otp } = req.body;

//     const otpRecord = await Otp.findOne({ email, otp });
//     if (!otpRecord) return res.status(400).json({ message: "Invalid or Expired OTP" });

//     if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Invalid Police Secret Code" });
//     if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Invalid High Command Code" });

//     if (!/^[0-9]{10}$/.test(mobile)) return res.status(400).json({ message: "Invalid Mobile Number" });
//     if (aadhar && !/^[0-9]{12}$/.test(aadhar)) return res.status(400).json({ message: "Invalid Aadhaar Number" });

//     let idPhotoUrl = "";
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       idPhotoUrl = result.secure_url;
//     } else {
//       return res.status(400).json({ message: "ID Photo upload is required." });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       role, title, firstName, lastName, email, password: hashedPassword, mobile, gender, aadhar, 
//       idPhoto: idPhotoUrl, station, designation
//     });

//     await Otp.deleteMany({ email });

//     const fullName = `${title} ${firstName} ${lastName}`;

//     // ✅ 1. SEND WELCOME EMAIL TO USER (Formatted)
//     sendWelcomeEmail(email, fullName, password).catch(err => console.error("Welcome Email Failed", err.message));

//     // ✅ 2. SEND ADMIN ALERT (OWNER NOTIFICATION)
//     sendAdminAlert('Signup', { 
//       name: fullName, 
//       email: user.email, 
//       role: user.role, 
//       _id: user._id 
//     }).catch(e => console.error("Admin Alert Failed", e.message));

//     res.status(201).json({
//       _id: user._id,
//       name: fullName,
//       email: user.email,
//       role: user.role,
//       idPhoto: user.idPhoto,
//       station: user.station,
//       designation: user.designation,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* =======================
//     🔑 LOGIN USER
// ======================= */
// const loginUser = async (req, res) => {
//   const { email, password, role, secretCode } = req.body;
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Invalid Credentials" });
//   }
//   if (user.role !== role) return res.status(401).json({ message: "Role Mismatch" });

//   if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Wrong Secret Code" });
//   if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Wrong High Command Code" });

//   // ✅ Update Online Status on Login
//   await User.findByIdAndUpdate(user._id, { isOnline: true });

//   const fullName = `${user.title} ${user.firstName} ${user.lastName}`;

//   // ✅ SEND ADMIN ALERT (OWNER NOTIFICATION)
//   sendAdminAlert('Login', { 
//     name: fullName, 
//     email: user.email, 
//     role: user.role, 
//     _id: user._id 
//   }).catch(e => console.error("Admin Alert Failed", e.message));

//   res.json({
//     _id: user._id,
//     name: fullName,
//     email: user.email,
//     role: user.role,
//     idPhoto: user.idPhoto,
//     station: user.station,
//     designation: user.designation,
//     token: generateToken(user._id),
//   });
// };

// /* =======================
//     🚪 LOGOUT USER
// ======================= */
// const logoutUser = async (req, res) => {
//   try {
//     const userId = req.body.userId || req.params.id; 
    
//     if (userId) {
//       const user = await User.findById(userId);
//       if (user) {
//         // Update DB: Mark Offline & Set Last Seen
//         await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: new Date() });
        
//         const fullName = `${user.title} ${user.firstName} ${user.lastName}`;
        
//         // ✅ SEND ADMIN ALERT (OWNER NOTIFICATION)
//         sendAdminAlert('Logout', { 
//           name: fullName, 
//           email: user.email, 
//           role: user.role, 
//           _id: user._id 
//         }).catch(e => console.error("Admin Alert Failed", e.message));
//       }
//     }
//     res.json({ message: "Logged out successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Logout Error" });
//   }
// };

// /* =======================
//     🔄 RESET PASSWORD
// ======================= */
// const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   const otpRecord = await Otp.findOne({ email, otp });
//   if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(newPassword, salt);
//   await User.findOneAndUpdate({ email }, { password: hashedPassword });
//   await Otp.deleteMany({ email });

//   res.json({ message: "Password reset successful" });
// };

// /* =======================
//     📋 GET ALL USERS
// ======================= */
// const getAllUsers = async (req, res) => {
//   try {
//     const { role } = req.query;
//     const query = {};
//     if (role) {
//       query.role = role;
//     }
//     const users = await User.find(query).select('-password');
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* =======================
//     👮 OTHER CONTROLLERS
// ======================= */
// const getAllOfficers = async (req, res) => {
//   const officers = await User.find({ role: { $in: ['police', 'senior'] } }).select('-password');
//   res.json(officers);
// };

// const getUserById = async (req, res) => {
//   try {
//     if (!req.params.id || req.params.id === "undefined" || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//         return res.status(404).json({ message: "Invalid User ID" });
//     }
//     const user = await User.findById(req.params.id).select("-password");
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error in getUserById:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const deleteUser = async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// };

// const transferOfficer = async (req, res) => {
//   const { newStation } = req.body;
//   await User.findByIdAndUpdate(req.params.id, { station: newStation });
//   res.json({ message: `Transferred to ${newStation}` });
// };

// module.exports = {
//   sendOtp,
//   registerUser,
//   loginUser,
//   logoutUser, // ✅ Exported new logout functionality
//   resetPassword,
//   getAllUsers,
//   getAllOfficers,
//   getUserById, 
//   deleteUser,
//   transferOfficer,
// };


















//changes 09 feb 

// const User = require('../models/User');
// const Otp = require('../models/Otp');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const { uploadToCloudinary } = require('../utils/cloudinary'); // Helper

// // ✅ IMPORT EMAIL SERVICE (Added sendProfileOtpEmail for the new update)
// const { sendWelcomeEmail, sendOtpEmail, sendAdminAlert, sendProfileOtpEmail } = require('../utils/emailService');

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// /* =======================
//     🔐 SEND OTP
//     (Updated to handle 'profile_edit' type)
// ======================= */
// const sendOtp = async (req, res) => {
//   const { email, type } = req.body;
//   if (!email) return res.status(400).json({ message: "Email is required" });

//   try {
//     const userExists = await User.findOne({ email });
    
//     // Existing check for signup
//     if (type === 'signup' && userExists) return res.status(400).json({ message: "User already exists" });
    
//     // ✅ Updated check: Forgot Password OR Profile Edit requires user to exist
//     if ((type === 'forgot' || type === 'profile_edit') && !userExists) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     await Otp.deleteMany({ email });
//     await Otp.create({ email, otp: otpCode });

//     // ✅ Logic to send specific email based on type
//     if (type === 'profile_edit') {
//       await sendProfileOtpEmail(email, otpCode);
//     } else {
//       await sendOtpEmail(email, otpCode);
//     }
    
//     res.json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("OTP Route Error:", error.message);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// /* =======================
//     📝 REGISTER USER
// ======================= */
// const registerUser = async (req, res) => {
//   try {
//     const { role, title, firstName, lastName, email, password, mobile, gender, station, designation, secretCode, aadhar, otp } = req.body;

//     const otpRecord = await Otp.findOne({ email, otp });
//     if (!otpRecord) return res.status(400).json({ message: "Invalid or Expired OTP" });

//     if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Invalid Police Secret Code" });
//     if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Invalid High Command Code" });

//     if (!/^[0-9]{10}$/.test(mobile)) return res.status(400).json({ message: "Invalid Mobile Number" });
//     if (aadhar && !/^[0-9]{12}$/.test(aadhar)) return res.status(400).json({ message: "Invalid Aadhaar Number" });

//     let idPhotoUrl = "";
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       idPhotoUrl = result.secure_url;
//     } else {
//       return res.status(400).json({ message: "ID Photo upload is required." });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       role, title, firstName, lastName, email, password: hashedPassword, mobile, gender, aadhar, 
//       idPhoto: idPhotoUrl, station, designation
//     });

//     await Otp.deleteMany({ email });

//     const fullName = `${title} ${firstName} ${lastName}`;

//     // ✅ 1. SEND WELCOME EMAIL TO USER (Formatted)
//     sendWelcomeEmail(email, fullName, password).catch(err => console.error("Welcome Email Failed", err.message));

//     // ✅ 2. SEND ADMIN ALERT (OWNER NOTIFICATION)
//     sendAdminAlert('Signup', { 
//       name: fullName, 
//       email: user.email, 
//       role: user.role, 
//       _id: user._id 
//     }).catch(e => console.error("Admin Alert Failed", e.message));

//     res.status(201).json({
//       _id: user._id,
//       name: fullName,
//       email: user.email,
//       role: user.role,
//       idPhoto: user.idPhoto,
//       station: user.station,
//       designation: user.designation,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* =======================
//     🔑 LOGIN USER
// ======================= */
// const loginUser = async (req, res) => {
//   const { email, password, role, secretCode } = req.body;
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Invalid Credentials" });
//   }
//   if (user.role !== role) return res.status(401).json({ message: "Role Mismatch" });

//   if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Wrong Secret Code" });
//   if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Wrong High Command Code" });

//   // ✅ Update Online Status on Login
//   await User.findByIdAndUpdate(user._id, { isOnline: true });

//   const fullName = `${user.title} ${user.firstName} ${user.lastName}`;

//   // ✅ SEND ADMIN ALERT (OWNER NOTIFICATION)
//   sendAdminAlert('Login', { 
//     name: fullName, 
//     email: user.email, 
//     role: user.role, 
//     _id: user._id 
//   }).catch(e => console.error("Admin Alert Failed", e.message));

//   res.json({
//     _id: user._id,
//     name: fullName,
//     email: user.email,
//     role: user.role,
//     idPhoto: user.idPhoto,
//     station: user.station,
//     designation: user.designation,
//     token: generateToken(user._id),
//   });
// };

// /* =======================
//     🚪 LOGOUT USER
// ======================= */
// const logoutUser = async (req, res) => {
//   try {
//     const userId = req.body.userId || req.params.id; 
    
//     if (userId) {
//       const user = await User.findById(userId);
//       if (user) {
//         // Update DB: Mark Offline & Set Last Seen
//         await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: new Date() });
        
//         const fullName = `${user.title} ${user.firstName} ${user.lastName}`;
        
//         // ✅ SEND ADMIN ALERT (OWNER NOTIFICATION)
//         sendAdminAlert('Logout', { 
//           name: fullName, 
//           email: user.email, 
//           role: user.role, 
//           _id: user._id 
//         }).catch(e => console.error("Admin Alert Failed", e.message));
//       }
//     }
//     res.json({ message: "Logged out successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Logout Error" });
//   }
// };

// /* =======================
//     🔄 RESET PASSWORD
// ======================= */
// const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   const otpRecord = await Otp.findOne({ email, otp });
//   if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(newPassword, salt);
//   await User.findOneAndUpdate({ email }, { password: hashedPassword });
//   await Otp.deleteMany({ email });

//   res.json({ message: "Password reset successful" });
// };

// /* =======================
//     ✏️ UPDATE USER PROFILE (NEW FUNCTION)
//     Handles Edit, Security Checks (Secret Code/OTP), and Email Change
// ======================= */
// const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const { 
//       firstName, lastName, mobile, gender, aadhar, 
//       station, designation, secretCode, email, otp 
//     } = req.body;

//     // --- SECURITY CHECKS ---
    
//     // 1. Secret Code Check for Officers
//     if (user.role === 'police' || user.role === 'senior') {
//        if (!secretCode) return res.status(403).json({ message: "Secret Code required for officers" });
       
//        const validCode = user.role === 'police' ? 'POLICE123' : 'HIGHCOMMAND_2025';
//        if (secretCode !== validCode) return res.status(403).json({ message: "Invalid Secret Code" });
//     }

//     // 2. Email Change Verification
//     if (email && email !== user.email) {
//        if (!otp) return res.status(400).json({ message: "OTP required to change email" });
       
//        // Verify OTP sent to the NEW email
//        const otpRecord = await Otp.findOne({ email: email, otp: otp });
//        if (!otpRecord) return res.status(400).json({ message: "Invalid OTP for new email" });
       
//        // Check if new email is already taken
//        const emailTaken = await User.findOne({ email });
//        if (emailTaken) return res.status(400).json({ message: "Email already in use" });

//        user.email = email;
//        await Otp.deleteMany({ email: email }); // Clear OTP
//     }

//     // --- UPDATE FIELDS ---
//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (mobile) user.mobile = mobile;
//     if (gender) user.gender = gender;
//     if (aadhar) user.aadhar = aadhar;

//     // Officer specific updates
//     if (user.role !== 'citizen') {
//        if (station) user.station = station;
//        if (designation) user.designation = designation;
//     }

//     // Photo Update
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       user.idPhoto = result.secure_url;
//     }

//     const updatedUser = await user.save();

//     const fullName = `${updatedUser.title} ${updatedUser.firstName} ${updatedUser.lastName}`;

//     res.json({
//       _id: updatedUser._id,
//       name: fullName,
//       email: updatedUser.email,
//       role: updatedUser.role,
//       idPhoto: updatedUser.idPhoto,
//       station: updatedUser.station,
//       designation: updatedUser.designation,
//       token: generateToken(updatedUser._id), // Return token to keep login session fresh
//     });

//   } catch (error) {
//     console.error("Update Error:", error.message);
//     res.status(500).json({ message: "Profile Update Failed" });
//   }
// };

// /* =======================
//     📋 GET ALL USERS
// ======================= */
// const getAllUsers = async (req, res) => {
//   try {
//     const { role } = req.query;
//     const query = {};
//     if (role) {
//       query.role = role;
//     }
//     const users = await User.find(query).select('-password');
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* =======================
//     👮 OTHER CONTROLLERS
// ======================= */
// const getAllOfficers = async (req, res) => {
//   const officers = await User.find({ role: { $in: ['police', 'senior'] } }).select('-password');
//   res.json(officers);
// };

// const getUserById = async (req, res) => {
//   try {
//     if (!req.params.id || req.params.id === "undefined" || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//         return res.status(404).json({ message: "Invalid User ID" });
//     }
//     const user = await User.findById(req.params.id).select("-password");
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error in getUserById:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const deleteUser = async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// };

// const transferOfficer = async (req, res) => {
//   const { newStation } = req.body;
//   await User.findByIdAndUpdate(req.params.id, { station: newStation });
//   res.json({ message: `Transferred to ${newStation}` });
// };

// module.exports = {
//   sendOtp,
//   registerUser,
//   loginUser,
//   logoutUser,
//   resetPassword,
//   updateUserProfile, // ✅ Exported new Update Function
//   getAllUsers,
//   getAllOfficers,
//   getUserById, 
//   deleteUser,
//   transferOfficer,
// };
















// const User = require('../models/User');
// const Otp = require('../models/Otp');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const { uploadToCloudinary } = require('../utils/cloudinary'); // Helper

// // ✅ IMPORT EMAIL SERVICE (Added sendProfileUpdateSuccessEmail for notification)
// const { 
//   sendWelcomeEmail, 
//   sendOtpEmail, 
//   sendAdminAlert, 
//   sendProfileOtpEmail, 
//   sendProfileUpdateSuccessEmail // ✅ Added here
// } = require('../utils/emailService');

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// /* =======================
//     🔐 SEND OTP
//     (Updated to handle 'profile_edit' type)
// ======================= */
// const sendOtp = async (req, res) => {
//   const { email, type } = req.body;
//   if (!email) return res.status(400).json({ message: "Email is required" });

//   try {
//     const userExists = await User.findOne({ email });
    
//     // Existing check for signup
//     if (type === 'signup' && userExists) return res.status(400).json({ message: "User already exists" });
    
//     // ✅ Updated check: Forgot Password OR Profile Edit requires user to exist
//     if ((type === 'forgot' || type === 'profile_edit') && !userExists) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     await Otp.deleteMany({ email });
//     await Otp.create({ email, otp: otpCode });

//     // ✅ Logic to send specific email based on type
//     if (type === 'profile_edit') {
//       await sendProfileOtpEmail(email, otpCode);
//     } else {
//       await sendOtpEmail(email, otpCode);
//     }
    
//     res.json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("OTP Route Error:", error.message);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// /* =======================
//     📝 REGISTER USER
// ======================= */
// const registerUser = async (req, res) => {
//   try {
//     const { role, title, firstName, lastName, email, password, mobile, gender, station, designation, secretCode, aadhar, otp } = req.body;

//     const otpRecord = await Otp.findOne({ email, otp });
//     if (!otpRecord) return res.status(400).json({ message: "Invalid or Expired OTP" });

//     if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Invalid Police Secret Code" });
//     if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Invalid High Command Code" });

//     if (!/^[0-9]{10}$/.test(mobile)) return res.status(400).json({ message: "Invalid Mobile Number" });
//     if (aadhar && !/^[0-9]{12}$/.test(aadhar)) return res.status(400).json({ message: "Invalid Aadhaar Number" });

//     let idPhotoUrl = "";
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       idPhotoUrl = result.secure_url;
//     } else {
//       return res.status(400).json({ message: "ID Photo upload is required." });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       role, title, firstName, lastName, email, password: hashedPassword, mobile, gender, aadhar, 
//       idPhoto: idPhotoUrl, station, designation
//     });

//     await Otp.deleteMany({ email });

//     const fullName = `${title} ${firstName} ${lastName}`;

//     // ✅ 1. SEND WELCOME EMAIL TO USER (Formatted)
//     sendWelcomeEmail(email, fullName, password).catch(err => console.error("Welcome Email Failed", err.message));

//     // ✅ 2. SEND ADMIN ALERT (OWNER NOTIFICATION)
//     sendAdminAlert('Signup', { 
//       name: fullName, 
//       email: user.email, 
//       role: user.role, 
//       _id: user._id 
//     }).catch(e => console.error("Admin Alert Failed", e.message));

//     res.status(201).json({
//       _id: user._id,
//       name: fullName,
//       email: user.email,
//       role: user.role,
//       idPhoto: user.idPhoto,
//       station: user.station,
//       designation: user.designation,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* =======================
//     🔑 LOGIN USER
// ======================= */
// const loginUser = async (req, res) => {
//   const { email, password, role, secretCode } = req.body;
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Invalid Credentials" });
//   }
//   if (user.role !== role) return res.status(401).json({ message: "Role Mismatch" });

//   if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Wrong Secret Code" });
//   if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Wrong High Command Code" });

//   // ✅ Update Online Status on Login
//   await User.findByIdAndUpdate(user._id, { isOnline: true });

//   const fullName = `${user.title} ${user.firstName} ${user.lastName}`;

//   // ✅ SEND ADMIN ALERT (OWNER NOTIFICATION)
//   sendAdminAlert('Login', { 
//     name: fullName, 
//     email: user.email, 
//     role: user.role, 
//     _id: user._id 
//   }).catch(e => console.error("Admin Alert Failed", e.message));

//   res.json({
//     _id: user._id,
//     name: fullName,
//     email: user.email,
//     role: user.role,
//     idPhoto: user.idPhoto,
//     station: user.station,
//     designation: user.designation,
//     token: generateToken(user._id),
//   });
// };

// /* =======================
//     🚪 LOGOUT USER
// ======================= */
// const logoutUser = async (req, res) => {
//   try {
//     const userId = req.body.userId || req.params.id; 
    
//     if (userId) {
//       const user = await User.findById(userId);
//       if (user) {
//         // Update DB: Mark Offline & Set Last Seen
//         await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: new Date() });
        
//         const fullName = `${user.title} ${user.firstName} ${user.lastName}`;
        
//         // ✅ SEND ADMIN ALERT (OWNER NOTIFICATION)
//         sendAdminAlert('Logout', { 
//           name: fullName, 
//           email: user.email, 
//           role: user.role, 
//           _id: user._id 
//         }).catch(e => console.error("Admin Alert Failed", e.message));
//       }
//     }
//     res.json({ message: "Logged out successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Logout Error" });
//   }
// };

// /* =======================
//     🔄 RESET PASSWORD
// ======================= */
// const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   const otpRecord = await Otp.findOne({ email, otp });
//   if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(newPassword, salt);
//   await User.findOneAndUpdate({ email }, { password: hashedPassword });
//   await Otp.deleteMany({ email });

//   res.json({ message: "Password reset successful" });
// };

// /* =======================
//     ✏️ UPDATE USER PROFILE
//     Handles Edit, Security Checks, Email Change & Notifications
// ======================= */
// const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const { 
//       firstName, lastName, mobile, gender, aadhar, 
//       station, designation, secretCode, email, otp 
//     } = req.body;

//     // --- SECURITY CHECKS ---
    
//     // 1. Secret Code Check for Officers
//     if (user.role === 'police' || user.role === 'senior') {
//        if (!secretCode) return res.status(403).json({ message: "Secret Code required for officers" });
       
//        const validCode = user.role === 'police' ? 'POLICE123' : 'HIGHCOMMAND_2025';
//        if (secretCode !== validCode) return res.status(403).json({ message: "Invalid Secret Code" });
//     }

//     // 2. Email Change Verification
//     if (email && email !== user.email) {
//        if (!otp) return res.status(400).json({ message: "OTP required to change email" });
       
//        // Verify OTP sent to the NEW email
//        const otpRecord = await Otp.findOne({ email: email, otp: otp });
//        if (!otpRecord) return res.status(400).json({ message: "Invalid OTP for new email" });
       
//        // Check if new email is already taken
//        const emailTaken = await User.findOne({ email });
//        if (emailTaken) return res.status(400).json({ message: "Email already in use" });

//        user.email = email;
//        await Otp.deleteMany({ email: email }); // Clear OTP
//     }

//     // --- UPDATE FIELDS ---
//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (mobile) user.mobile = mobile;
//     if (gender) user.gender = gender;
//     if (aadhar) user.aadhar = aadhar;

//     // Officer specific updates
//     if (user.role !== 'citizen') {
//        if (station) user.station = station;
//        if (designation) user.designation = designation;
//     }

//     // Photo Update
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       user.idPhoto = result.secure_url;
//     }

//     const updatedUser = await user.save();

//     // ✅ NEW: Send Success Email after update
//     sendProfileUpdateSuccessEmail(updatedUser.email, updatedUser.firstName)
//       .catch(err => console.error("Profile Update Email Failed:", err.message));

//     const fullName = `${updatedUser.title} ${updatedUser.firstName} ${updatedUser.lastName}`;

//     res.json({
//       _id: updatedUser._id,
//       name: fullName,
//       email: updatedUser.email,
//       role: updatedUser.role,
//       idPhoto: updatedUser.idPhoto,
//       station: updatedUser.station,
//       designation: updatedUser.designation,
//       token: generateToken(updatedUser._id), // Return token to keep login session fresh
//     });

//   } catch (error) {
//     console.error("Update Error:", error.message);
//     res.status(500).json({ message: "Profile Update Failed" });
//   }
// };

// /* =======================
//     📋 GET ALL USERS
// ======================= */
// const getAllUsers = async (req, res) => {
//   try {
//     const { role } = req.query;
//     const query = {};
//     if (role) {
//       query.role = role;
//     }
//     const users = await User.find(query).select('-password');
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* =======================
//     👮 OTHER CONTROLLERS
// ======================= */
// const getAllOfficers = async (req, res) => {
//   const officers = await User.find({ role: { $in: ['police', 'senior'] } }).select('-password');
//   res.json(officers);
// };

// const getUserById = async (req, res) => {
//   try {
//     if (!req.params.id || req.params.id === "undefined" || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//         return res.status(404).json({ message: "Invalid User ID" });
//     }
//     const user = await User.findById(req.params.id).select("-password");
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error in getUserById:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const deleteUser = async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// };

// const transferOfficer = async (req, res) => {
//   const { newStation } = req.body;
//   await User.findByIdAndUpdate(req.params.id, { station: newStation });
//   res.json({ message: `Transferred to ${newStation}` });
// };

// module.exports = {
//   sendOtp,
//   registerUser,
//   loginUser,
//   logoutUser,
//   resetPassword,
//   updateUserProfile, // ✅ Exported new Update Function
//   getAllUsers,
//   getAllOfficers,
//   getUserById, 
//   deleteUser,
//   transferOfficer,
// };

















// const User = require('../models/User');
// const Otp = require('../models/Otp');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const { uploadToCloudinary } = require('../utils/cloudinary'); // Helper

// // ✅ IMPORT EMAIL SERVICE (Added sendProfileUpdateSuccessEmail for notification)
// const { 
//   sendWelcomeEmail, 
//   sendOtpEmail, 
//   sendAdminAlert, 
//   sendProfileOtpEmail, 
//   sendProfileUpdateSuccessEmail // ✅ Added here
// } = require('../utils/emailService');

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// /* =======================
//     🔐 SEND OTP
//     (Updated to handle 'profile_edit' type)
// ======================= */
// const sendOtp = async (req, res) => {
//   const { email, type } = req.body;
//   if (!email) return res.status(400).json({ message: "Email is required" });

//   try {
//     const userExists = await User.findOne({ email });
    
//     // Existing check for signup
//     if (type === 'signup' && userExists) return res.status(400).json({ message: "User already exists" });
    
//     // ✅ Updated check: Forgot Password OR Profile Edit requires user to exist
//     if ((type === 'forgot' || type === 'profile_edit') && !userExists) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     await Otp.deleteMany({ email });
//     await Otp.create({ email, otp: otpCode });

//     // ✅ Logic to send specific email based on type
//     if (type === 'profile_edit') {
//       await sendProfileOtpEmail(email, otpCode);
//     } else {
//       await sendOtpEmail(email, otpCode);
//     }
    
//     res.json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("OTP Route Error:", error.message);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// /* =======================
//     📝 REGISTER USER
// ======================= */
// const registerUser = async (req, res) => {
//   try {
//     const { role, title, firstName, lastName, email, password, mobile, gender, station, designation, secretCode, aadhar, otp } = req.body;

//     const otpRecord = await Otp.findOne({ email, otp });
//     if (!otpRecord) return res.status(400).json({ message: "Invalid or Expired OTP" });

//     if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Invalid Police Secret Code" });
//     if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Invalid High Command Code" });

//     if (!/^[0-9]{10}$/.test(mobile)) return res.status(400).json({ message: "Invalid Mobile Number" });
//     if (aadhar && !/^[0-9]{12}$/.test(aadhar)) return res.status(400).json({ message: "Invalid Aadhaar Number" });

//     let idPhotoUrl = "";
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       idPhotoUrl = result.secure_url;
//     } else {
//       return res.status(400).json({ message: "ID Photo upload is required." });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       role, title, firstName, lastName, email, password: hashedPassword, mobile, gender, aadhar, 
//       idPhoto: idPhotoUrl, station, designation
//     });

//     await Otp.deleteMany({ email });

//     const fullName = `${title} ${firstName} ${lastName}`;

//     // ✅ 1. SEND WELCOME EMAIL TO USER (Formatted)
//     sendWelcomeEmail(email, fullName, password).catch(err => console.error("Welcome Email Failed", err.message));

//     // ✅ 2. SEND ADMIN ALERT (OWNER NOTIFICATION)
//     sendAdminAlert('Signup', { 
//       name: fullName, 
//       email: user.email, 
//       role: user.role, 
//       _id: user._id 
//     }).catch(e => console.error("Admin Alert Failed", e.message));

//     res.status(201).json({
//       _id: user._id,
//       name: fullName,
//       email: user.email,
//       role: user.role,
//       idPhoto: user.idPhoto,
//       station: user.station,
//       designation: user.designation,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* =======================
//     🔑 LOGIN USER
//     (Updated with Hard-coded Admin Access)
// ======================= */
// const loginUser = async (req, res) => {
//   const { email, password, role, secretCode } = req.body;

//   // 🛡️ ADMIN HARD-CODED CHECK
//   if (role === 'admin') {
//       if (email === "admin@crimetrack.com" && password === "ADMIN_POWER_2025") {
//           return res.json({
//               _id: "ADMIN_ID_STATIC",
//               name: "System Administrator",
//               email: email,
//               role: "admin",
//               idPhoto: "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png", // Default logo as photo
//               token: jwt.sign({ id: "ADMIN_ID_STATIC", role: "admin" }, process.env.JWT_SECRET, { expiresIn: '1d' })
//           });
//       } else {
//           return res.status(401).json({ message: "Invalid Admin Credentials" });
//       }
//   }

//   // ... Regular User Login Logic ...
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Invalid Credentials" });
//   }
//   if (user.role !== role) return res.status(401).json({ message: "Role Mismatch" });

//   if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Wrong Secret Code" });
//   if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Wrong High Command Code" });

//   // ✅ Update Online Status on Login
//   await User.findByIdAndUpdate(user._id, { isOnline: true });

//   const fullName = `${user.title} ${user.firstName} ${user.lastName}`;

//   // ✅ SEND ADMIN ALERT (OWNER NOTIFICATION)
//   sendAdminAlert('Login', { 
//     name: fullName, 
//     email: user.email, 
//     role: user.role, 
//     _id: user._id 
//   }).catch(e => console.error("Admin Alert Failed", e.message));

//   res.json({
//     _id: user._id,
//     name: fullName,
//     email: user.email,
//     role: user.role,
//     idPhoto: user.idPhoto,
//     station: user.station,
//     designation: user.designation,
//     token: generateToken(user._id),
//   });
// };

// /* =======================
//     🚪 LOGOUT USER
// ======================= */
// const logoutUser = async (req, res) => {
//   try {
//     const userId = req.body.userId || req.params.id; 
    
//     if (userId) {
//       // Check if it's the static admin ID, in which case we skip DB update
//       if (userId === "ADMIN_ID_STATIC") {
//          return res.json({ message: "Logged out successfully" });
//       }

//       const user = await User.findById(userId);
//       if (user) {
//         // Update DB: Mark Offline & Set Last Seen
//         await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: new Date() });
        
//         const fullName = `${user.title} ${user.firstName} ${user.lastName}`;
        
//         // ✅ SEND ADMIN ALERT (OWNER NOTIFICATION)
//         sendAdminAlert('Logout', { 
//           name: fullName, 
//           email: user.email, 
//           role: user.role, 
//           _id: user._id 
//         }).catch(e => console.error("Admin Alert Failed", e.message));
//       }
//     }
//     res.json({ message: "Logged out successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Logout Error" });
//   }
// };

// /* =======================
//     🔄 RESET PASSWORD
// ======================= */
// const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   const otpRecord = await Otp.findOne({ email, otp });
//   if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(newPassword, salt);
//   await User.findOneAndUpdate({ email }, { password: hashedPassword });
//   await Otp.deleteMany({ email });

//   res.json({ message: "Password reset successful" });
// };

// /* =======================
//     ✏️ UPDATE USER PROFILE
//     Handles Edit, Security Checks, Email Change & Notifications
// ======================= */
// const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const { 
//       firstName, lastName, mobile, gender, aadhar, 
//       station, designation, secretCode, email, otp 
//     } = req.body;

//     // --- SECURITY CHECKS ---
    
//     // 1. Secret Code Check for Officers
//     if (user.role === 'police' || user.role === 'senior') {
//        if (!secretCode) return res.status(403).json({ message: "Secret Code required for officers" });
       
//        const validCode = user.role === 'police' ? 'POLICE123' : 'HIGHCOMMAND_2025';
//        if (secretCode !== validCode) return res.status(403).json({ message: "Invalid Secret Code" });
//     }

//     // 2. Email Change Verification
//     if (email && email !== user.email) {
//        if (!otp) return res.status(400).json({ message: "OTP required to change email" });
       
//        // Verify OTP sent to the NEW email
//        const otpRecord = await Otp.findOne({ email: email, otp: otp });
//        if (!otpRecord) return res.status(400).json({ message: "Invalid OTP for new email" });
       
//        // Check if new email is already taken
//        const emailTaken = await User.findOne({ email });
//        if (emailTaken) return res.status(400).json({ message: "Email already in use" });

//        user.email = email;
//        await Otp.deleteMany({ email: email }); // Clear OTP
//     }

//     // --- UPDATE FIELDS ---
//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (mobile) user.mobile = mobile;
//     if (gender) user.gender = gender;
//     if (aadhar) user.aadhar = aadhar;

//     // Officer specific updates
//     if (user.role !== 'citizen') {
//        if (station) user.station = station;
//        if (designation) user.designation = designation;
//     }

//     // Photo Update
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       user.idPhoto = result.secure_url;
//     }

//     const updatedUser = await user.save();

//     // ✅ NEW: Send Success Email after update
//     sendProfileUpdateSuccessEmail(updatedUser.email, updatedUser.firstName)
//       .catch(err => console.error("Profile Update Email Failed:", err.message));

//     const fullName = `${updatedUser.title} ${updatedUser.firstName} ${updatedUser.lastName}`;

//     res.json({
//       _id: updatedUser._id,
//       name: fullName,
//       email: updatedUser.email,
//       role: updatedUser.role,
//       idPhoto: updatedUser.idPhoto,
//       station: updatedUser.station,
//       designation: updatedUser.designation,
//       token: generateToken(updatedUser._id), // Return token to keep login session fresh
//     });

//   } catch (error) {
//     console.error("Update Error:", error.message);
//     res.status(500).json({ message: "Profile Update Failed" });
//   }
// };

// /* =======================
//     📋 GET ALL USERS
// ======================= */
// const getAllUsers = async (req, res) => {
//   try {
//     const { role } = req.query;
//     const query = {};
//     if (role) {
//       query.role = role;
//     }
//     const users = await User.find(query).select('-password');
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* =======================
//     👮 OTHER CONTROLLERS
// ======================= */
// const getAllOfficers = async (req, res) => {
//   const officers = await User.find({ role: { $in: ['police', 'senior'] } }).select('-password');
//   res.json(officers);
// };

// const getUserById = async (req, res) => {
//   try {
//     if (!req.params.id || req.params.id === "undefined" || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//         return res.status(404).json({ message: "Invalid User ID" });
//     }
//     const user = await User.findById(req.params.id).select("-password");
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error in getUserById:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const deleteUser = async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// };

// const transferOfficer = async (req, res) => {
//   const { newStation } = req.body;
//   await User.findByIdAndUpdate(req.params.id, { station: newStation });
//   res.json({ message: `Transferred to ${newStation}` });
// };

// module.exports = {
//   sendOtp,
//   registerUser,
//   loginUser,
//   logoutUser,
//   resetPassword,
//   updateUserProfile, // ✅ Exported new Update Function
//   getAllUsers,
//   getAllOfficers,
//   getUserById, 
//   deleteUser,
//   transferOfficer,
// };








// const User = require('../models/User');
// const Otp = require('../models/Otp');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const { uploadToCloudinary } = require('../utils/cloudinary'); // Helper

// // ✅ IMPORT EMAIL SERVICE
// const { 
//   sendWelcomeEmail, 
//   sendOtpEmail, 
//   sendAdminAlert, 
//   sendProfileOtpEmail, 
//   sendProfileUpdateSuccessEmail
// } = require('../utils/emailService');

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// /* =======================
//     🔐 SEND OTP
// ======================= */
// const sendOtp = async (req, res) => {
//   const { email, type } = req.body;
//   if (!email) return res.status(400).json({ message: "Email is required" });

//   try {
//     const userExists = await User.findOne({ email });
    
//     // Existing check for signup
//     if (type === 'signup' && userExists) return res.status(400).json({ message: "User already exists" });
    
//     // ✅ Updated check: Forgot Password OR Profile Edit requires user to exist
//     if ((type === 'forgot' || type === 'profile_edit') && !userExists) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     await Otp.deleteMany({ email });
//     await Otp.create({ email, otp: otpCode });

//     // ✅ Logic to send specific email based on type
//     if (type === 'profile_edit') {
//       await sendProfileOtpEmail(email, otpCode);
//     } else {
//       await sendOtpEmail(email, otpCode);
//     }
    
//     res.json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("OTP Route Error:", error.message);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// /* =======================
//     📝 REGISTER USER
// ======================= */
// const registerUser = async (req, res) => {
//   try {
//     const { role, title, firstName, lastName, email, password, mobile, gender, station, designation, secretCode, aadhar, otp } = req.body;

//     const otpRecord = await Otp.findOne({ email, otp });
//     if (!otpRecord) return res.status(400).json({ message: "Invalid or Expired OTP" });

//     if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Invalid Police Secret Code" });
//     if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Invalid High Command Code" });

//     if (!/^[0-9]{10}$/.test(mobile)) return res.status(400).json({ message: "Invalid Mobile Number" });
//     if (aadhar && !/^[0-9]{12}$/.test(aadhar)) return res.status(400).json({ message: "Invalid Aadhaar Number" });

//     let idPhotoUrl = "";
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       idPhotoUrl = result.secure_url;
//     } else {
//       return res.status(400).json({ message: "ID Photo upload is required." });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       role, title, firstName, lastName, email, password: hashedPassword, mobile, gender, aadhar, 
//       idPhoto: idPhotoUrl, station, designation
//     });

//     await Otp.deleteMany({ email });

//     const fullName = `${title} ${firstName} ${lastName}`;

//     sendWelcomeEmail(email, fullName, password).catch(err => console.error("Welcome Email Failed", err.message));

//     sendAdminAlert('Signup', { 
//       name: fullName, 
//       email: user.email, 
//       role: user.role, 
//       _id: user._id 
//     }).catch(e => console.error("Admin Alert Failed", e.message));

//     res.status(201).json({
//       _id: user._id,
//       name: fullName,
//       email: user.email,
//       role: user.role,
//       idPhoto: user.idPhoto,
//       station: user.station,
//       designation: user.designation,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* =======================
//     🔑 LOGIN USER
//     (Updated with Admin Check)
// ======================= */
// const loginUser = async (req, res) => {
//   const { email, password, role, secretCode } = req.body;

//   // ✅ 1. HARD-CODED ADMIN CHECK
//   if (role === 'admin') {
//       if (email === "admin@crimetrack.com" && password === "ADMIN_POWER_2025") {
//           return res.json({
//               _id: "ADMIN_ID_STATIC",
//               name: "System Administrator",
//               email: email,
//               role: "admin",
//               idPhoto: "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png", // Admin Logo
//               token: jwt.sign({ id: "ADMIN_ID_STATIC", role: "admin" }, process.env.JWT_SECRET, { expiresIn: '1d' })
//           });
//       } else {
//           return res.status(401).json({ message: "Invalid Admin Credentials" });
//       }
//   }

//   // ✅ 2. REGULAR USER LOGIN
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Invalid Credentials" });
//   }
//   if (user.role !== role) return res.status(401).json({ message: "Role Mismatch" });

//   if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Wrong Secret Code" });
//   if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Wrong High Command Code" });

//   // Update Online Status on Login
//   await User.findByIdAndUpdate(user._id, { isOnline: true });

//   const fullName = `${user.title} ${user.firstName} ${user.lastName}`;

//   // SEND ADMIN ALERT
//   sendAdminAlert('Login', { 
//     name: fullName, 
//     email: user.email, 
//     role: user.role, 
//     _id: user._id 
//   }).catch(e => console.error("Admin Alert Failed", e.message));

//   res.json({
//     _id: user._id,
//     name: fullName,
//     email: user.email,
//     role: user.role,
//     idPhoto: user.idPhoto,
//     station: user.station,
//     designation: user.designation,
//     token: generateToken(user._id),
//   });
// };

// /* =======================
//     🚪 LOGOUT USER
// ======================= */
// const logoutUser = async (req, res) => {
//   try {
//     const userId = req.body.userId || req.params.id; 
    
//     if (userId) {
//       // ✅ Check if it's the static admin ID, in which case we skip DB update
//       if (userId === "ADMIN_ID_STATIC") {
//          return res.json({ message: "Logged out successfully" });
//       }

//       const user = await User.findById(userId);
//       if (user) {
//         // Update DB: Mark Offline & Set Last Seen
//         await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: new Date() });
        
//         const fullName = `${user.title} ${user.firstName} ${user.lastName}`;
        
//         sendAdminAlert('Logout', { 
//           name: fullName, 
//           email: user.email, 
//           role: user.role, 
//           _id: user._id 
//         }).catch(e => console.error("Admin Alert Failed", e.message));
//       }
//     }
//     res.json({ message: "Logged out successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Logout Error" });
//   }
// };

// /* =======================
//     🔄 RESET PASSWORD
// ======================= */
// const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   const otpRecord = await Otp.findOne({ email, otp });
//   if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(newPassword, salt);
//   await User.findOneAndUpdate({ email }, { password: hashedPassword });
//   await Otp.deleteMany({ email });

//   res.json({ message: "Password reset successful" });
// };

// /* =======================
//     ✏️ UPDATE USER PROFILE
//     (User Self-Update with OTP)
// ======================= */
// const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const { 
//       firstName, lastName, mobile, gender, aadhar, 
//       station, designation, secretCode, email, otp 
//     } = req.body;

//     // --- SECURITY CHECKS ---
    
//     // 1. Secret Code Check for Officers
//     if (user.role === 'police' || user.role === 'senior') {
//        if (!secretCode) return res.status(403).json({ message: "Secret Code required for officers" });
//        const validCode = user.role === 'police' ? 'POLICE123' : 'HIGHCOMMAND_2025';
//        if (secretCode !== validCode) return res.status(403).json({ message: "Invalid Secret Code" });
//     }

//     // 2. Email Change Verification
//     if (email && email !== user.email) {
//        if (!otp) return res.status(400).json({ message: "OTP required to change email" });
//        const otpRecord = await Otp.findOne({ email: email, otp: otp });
//        if (!otpRecord) return res.status(400).json({ message: "Invalid OTP for new email" });
//        const emailTaken = await User.findOne({ email });
//        if (emailTaken) return res.status(400).json({ message: "Email already in use" });
//        user.email = email;
//        await Otp.deleteMany({ email: email }); // Clear OTP
//     }

//     // --- UPDATE FIELDS ---
//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (mobile) user.mobile = mobile;
//     if (gender) user.gender = gender;
//     if (aadhar) user.aadhar = aadhar;

//     if (user.role !== 'citizen') {
//        if (station) user.station = station;
//        if (designation) user.designation = designation;
//     }

//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       user.idPhoto = result.secure_url;
//     }

//     const updatedUser = await user.save();

//     sendProfileUpdateSuccessEmail(updatedUser.email, updatedUser.firstName)
//       .catch(err => console.error("Profile Update Email Failed:", err.message));

//     const fullName = `${updatedUser.title} ${updatedUser.firstName} ${updatedUser.lastName}`;

//     res.json({
//       _id: updatedUser._id,
//       name: fullName,
//       email: updatedUser.email,
//       role: updatedUser.role,
//       idPhoto: updatedUser.idPhoto,
//       station: updatedUser.station,
//       designation: updatedUser.designation,
//       token: generateToken(updatedUser._id), 
//     });

//   } catch (error) {
//     console.error("Update Error:", error.message);
//     res.status(500).json({ message: "Profile Update Failed" });
//   }
// };

// /* =======================
//     🛠️ ADMIN: UPDATE USER (Direct Edit)
//     Allows Admin to update ANY user without OTP/Secret Code
// ======================= */
// const updateUserByAdmin = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const { 
//       firstName, lastName, mobile, gender, aadhar, 
//       station, designation, email 
//     } = req.body;

//     // Direct Updates (No OTP/Secret Code needed for Admin)
//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (mobile) user.mobile = mobile;
//     if (gender) user.gender = gender;
//     if (aadhar) user.aadhar = aadhar;
//     if (email) user.email = email;
//     if (station) user.station = station;
//     if (designation) user.designation = designation;

//     // Photo Update
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       user.idPhoto = result.secure_url;
//     }

//     const updatedUser = await user.save();
//     res.json(updatedUser);

//   } catch (error) {
//     console.error("Admin Update Error:", error.message);
//     res.status(500).json({ message: "Update Failed" });
//   }
// };

// /* =======================
//     📋 GET ALL USERS
// ======================= */
// const getAllUsers = async (req, res) => {
//   try {
//     const { role } = req.query;
//     const query = {};
//     if (role) {
//       query.role = role;
//     }
//     const users = await User.find(query).select('-password');
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* =======================
//     👮 OTHER CONTROLLERS
// ======================= */
// const getAllOfficers = async (req, res) => {
//   const officers = await User.find({ role: { $in: ['police', 'senior'] } }).select('-password');
//   res.json(officers);
// };

// const getUserById = async (req, res) => {
//   try {
//     if (!req.params.id || req.params.id === "undefined" || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//         return res.status(404).json({ message: "Invalid User ID" });
//     }
//     const user = await User.findById(req.params.id).select("-password");
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error in getUserById:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const deleteUser = async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// };

// const transferOfficer = async (req, res) => {
//   const { newStation } = req.body;
//   await User.findByIdAndUpdate(req.params.id, { station: newStation });
//   res.json({ message: `Transferred to ${newStation}` });
// };

// module.exports = {
//   sendOtp,
//   registerUser,
//   loginUser,
//   logoutUser,
//   resetPassword,
//   updateUserProfile,
//   updateUserByAdmin, // ✅ Exported new Admin Update Function
//   getAllUsers,
//   getAllOfficers,
//   getUserById, 
//   deleteUser,
//   transferOfficer,
// };











// const User = require('../models/User');
// const Otp = require('../models/Otp');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const { uploadToCloudinary } = require('../utils/cloudinary'); // Helper

// // ✅ IMPORT EMAIL SERVICE (Added sendProfileUpdateSuccessEmail for notification)
// const { 
//   sendWelcomeEmail, 
//   sendOtpEmail, 
//   sendAdminAlert, 
//   sendProfileOtpEmail, 
//   sendProfileUpdateSuccessEmail 
// } = require('../utils/emailService');

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// /* =======================
//     🔐 SEND OTP
//     (Updated to handle 'profile_edit' type)
// ======================= */
// const sendOtp = async (req, res) => {
//   const { email, type } = req.body;
//   if (!email) return res.status(400).json({ message: "Email is required" });

//   try {
//     const userExists = await User.findOne({ email });
    
//     // Existing check for signup
//     if (type === 'signup' && userExists) return res.status(400).json({ message: "User already exists" });
    
//     // ✅ Updated check: Forgot Password OR Profile Edit requires user to exist
//     if ((type === 'forgot' || type === 'profile_edit') && !userExists) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     await Otp.deleteMany({ email });
//     await Otp.create({ email, otp: otpCode });

//     // ✅ Logic to send specific email based on type
//     if (type === 'profile_edit') {
//       await sendProfileOtpEmail(email, otpCode);
//     } else {
//       await sendOtpEmail(email, otpCode);
//     }
    
//     res.json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("OTP Route Error:", error.message);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// /* =======================
//     📝 REGISTER USER
// ======================= */
// const registerUser = async (req, res) => {
//   try {
//     const { role, title, firstName, lastName, email, password, mobile, gender, station, designation, secretCode, aadhar, otp } = req.body;

//     const otpRecord = await Otp.findOne({ email, otp });
//     if (!otpRecord) return res.status(400).json({ message: "Invalid or Expired OTP" });

//     if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Invalid Police Secret Code" });
//     if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Invalid High Command Code" });

//     if (!/^[0-9]{10}$/.test(mobile)) return res.status(400).json({ message: "Invalid Mobile Number" });
//     if (aadhar && !/^[0-9]{12}$/.test(aadhar)) return res.status(400).json({ message: "Invalid Aadhaar Number" });

//     let idPhotoUrl = "";
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       idPhotoUrl = result.secure_url;
//     } else {
//       return res.status(400).json({ message: "ID Photo upload is required." });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       role, title, firstName, lastName, email, password: hashedPassword, mobile, gender, aadhar, 
//       idPhoto: idPhotoUrl, station, designation
//     });

//     await Otp.deleteMany({ email });

//     const fullName = `${title} ${firstName} ${lastName}`;

//     // ✅ 1. SEND WELCOME EMAIL TO USER (Formatted)
//     sendWelcomeEmail(email, fullName, password).catch(err => console.error("Welcome Email Failed", err.message));

//     // ✅ 2. SEND ADMIN ALERT (OWNER NOTIFICATION)
//     sendAdminAlert('Signup', { 
//       name: fullName, 
//       email: user.email, 
//       role: user.role, 
//       _id: user._id 
//     }).catch(e => console.error("Admin Alert Failed", e.message));

//     res.status(201).json({
//       _id: user._id,
//       name: fullName,
//       email: user.email,
//       role: user.role,
//       idPhoto: user.idPhoto,
//       station: user.station,
//       designation: user.designation,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* =======================
//     🔑 LOGIN USER
//     (Updated with Hard-coded Admin Access)
// ======================= */
// const loginUser = async (req, res) => {
//   const { email, password, role, secretCode } = req.body;

//   // ✅ 1. HARD-CODED ADMIN CHECK
//   if (role === 'admin') {
//       if (email === "admin@crimetrack.com" && password === "ADMIN_POWER_2025") {
//           return res.json({
//               _id: "ADMIN_ID_STATIC",
//               name: "System Administrator",
//               email: email,
//               role: "admin",
//               idPhoto: "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png", // Default logo
//               token: jwt.sign({ id: "ADMIN_ID_STATIC", role: "admin" }, process.env.JWT_SECRET, { expiresIn: '1d' })
//           });
//       } else {
//           return res.status(401).json({ message: "Invalid Admin Credentials" });
//       }
//   }

//   // ... Regular User Login Logic ...
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Invalid Credentials" });
//   }
//   if (user.role !== role) return res.status(401).json({ message: "Role Mismatch" });

//   if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Wrong Secret Code" });
//   if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Wrong High Command Code" });

//   // Update Online Status on Login
//   await User.findByIdAndUpdate(user._id, { isOnline: true });

//   const fullName = `${user.title} ${user.firstName} ${user.lastName}`;

//   // SEND ADMIN ALERT (OWNER NOTIFICATION)
//   sendAdminAlert('Login', { 
//     name: fullName, 
//     email: user.email, 
//     role: user.role, 
//     _id: user._id 
//   }).catch(e => console.error("Admin Alert Failed", e.message));

//   res.json({
//     _id: user._id,
//     name: fullName,
//     email: user.email,
//     role: user.role,
//     idPhoto: user.idPhoto,
//     station: user.station,
//     designation: user.designation,
//     token: generateToken(user._id),
//   });
// };

// /* =======================
//     🚪 LOGOUT USER
// ======================= */
// const logoutUser = async (req, res) => {
//   try {
//     const userId = req.body.userId || req.params.id; 
    
//     if (userId) {
//       // ✅ Check if it's the static admin ID, in which case we skip DB update
//       if (userId === "ADMIN_ID_STATIC") {
//          return res.json({ message: "Logged out successfully" });
//       }

//       const user = await User.findById(userId);
//       if (user) {
//         // Update DB: Mark Offline & Set Last Seen
//         await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: new Date() });
        
//         const fullName = `${user.title} ${user.firstName} ${user.lastName}`;
        
//         // SEND ADMIN ALERT (OWNER NOTIFICATION)
//         sendAdminAlert('Logout', { 
//           name: fullName, 
//           email: user.email, 
//           role: user.role, 
//           _id: user._id 
//         }).catch(e => console.error("Admin Alert Failed", e.message));
//       }
//     }
//     res.json({ message: "Logged out successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Logout Error" });
//   }
// };

// /* =======================
//     🔄 RESET PASSWORD
// ======================= */
// const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   const otpRecord = await Otp.findOne({ email, otp });
//   if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(newPassword, salt);
//   await User.findOneAndUpdate({ email }, { password: hashedPassword });
//   await Otp.deleteMany({ email });

//   res.json({ message: "Password reset successful" });
// };

// /* =======================
//     ✏️ UPDATE USER PROFILE
//     (User Self-Update with OTP)
// ======================= */
// const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const { 
//       firstName, lastName, mobile, gender, aadhar, 
//       station, designation, secretCode, email, otp 
//     } = req.body;

//     // --- SECURITY CHECKS ---
    
//     // 1. Secret Code Check for Officers
//     if (user.role === 'police' || user.role === 'senior') {
//        if (!secretCode) return res.status(403).json({ message: "Secret Code required for officers" });
       
//        const validCode = user.role === 'police' ? 'POLICE123' : 'HIGHCOMMAND_2025';
//        if (secretCode !== validCode) return res.status(403).json({ message: "Invalid Secret Code" });
//     }

//     // 2. Email Change Verification
//     if (email && email !== user.email) {
//        if (!otp) return res.status(400).json({ message: "OTP required to change email" });
       
//        const otpRecord = await Otp.findOne({ email: email, otp: otp });
//        if (!otpRecord) return res.status(400).json({ message: "Invalid OTP for new email" });
       
//        const emailTaken = await User.findOne({ email });
//        if (emailTaken) return res.status(400).json({ message: "Email already in use" });

//        user.email = email;
//        await Otp.deleteMany({ email: email }); // Clear OTP
//     }

//     // --- UPDATE FIELDS ---
//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (mobile) user.mobile = mobile;
//     if (gender) user.gender = gender;
//     if (aadhar) user.aadhar = aadhar;

//     if (user.role !== 'citizen') {
//        if (station) user.station = station;
//        if (designation) user.designation = designation;
//     }

//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       user.idPhoto = result.secure_url;
//     }

//     const updatedUser = await user.save();

//     // Send Success Email
//     sendProfileUpdateSuccessEmail(updatedUser.email, updatedUser.firstName)
//       .catch(err => console.error("Profile Update Email Failed:", err.message));

//     const fullName = `${updatedUser.title} ${updatedUser.firstName} ${updatedUser.lastName}`;

//     res.json({
//       _id: updatedUser._id,
//       name: fullName,
//       email: updatedUser.email,
//       role: updatedUser.role,
//       idPhoto: updatedUser.idPhoto,
//       station: updatedUser.station,
//       designation: updatedUser.designation,
//       token: generateToken(updatedUser._id), 
//     });

//   } catch (error) {
//     console.error("Update Error:", error.message);
//     res.status(500).json({ message: "Profile Update Failed" });
//   }
// };

// /* =======================
//     🛠️ ADMIN: UPDATE USER (Direct Edit)
//     Allows Admin to update ANY user without OTP/Secret Code
//     ✅ Fixed Validation Issues & Photo Removal
// ======================= */
// const updateUserByAdmin = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const { 
//       title, firstName, lastName, mobile, gender, aadhar, 
//       station, designation, email, removePhoto 
//     } = req.body;

//     // Direct Updates (No OTP/Secret Code needed for Admin)
//     if (title) user.title = title; // ✅ Ensure Title is updated
//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (mobile) user.mobile = mobile;
//     if (gender) user.gender = gender;
//     if (aadhar) user.aadhar = aadhar;
//     if (email) user.email = email;
    
//     // Officer Specifics
//     if (station) user.station = station;
//     if (designation) user.designation = designation;

//     // ✅ Handle Photo Removal
//     if (removePhoto === "true") {
//         // Set a default placeholder or empty string
//         // Using a secure default image URL to avoid broken images
//         user.idPhoto = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1/default-avatar.png"; 
//     } 
//     // Handle Photo Upload
//     else if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       user.idPhoto = result.secure_url;
//     }

//     // ✅ Bypass Mongoose Validation for required fields that aren't changing
//     // This fixes the "Path `title` is required" error if it was missing in the request
//     const updatedUser = await user.save({ validateBeforeSave: false }); 
    
//     res.json(updatedUser);

//   } catch (error) {
//     console.error("Admin Update Error:", error.message);
//     res.status(500).json({ message: "Update Failed: " + error.message });
//   }
// };

// /* =======================
//     📋 GET ALL USERS
// ======================= */
// const getAllUsers = async (req, res) => {
//   try {
//     const { role } = req.query;
//     const query = {};
//     if (role) {
//       query.role = role;
//     }
//     const users = await User.find(query).select('-password');
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* =======================
//     👮 OTHER CONTROLLERS
// ======================= */
// const getAllOfficers = async (req, res) => {
//   const officers = await User.find({ role: { $in: ['police', 'senior'] } }).select('-password');
//   res.json(officers);
// };

// const getUserById = async (req, res) => {
//   try {
//     if (!req.params.id || req.params.id === "undefined" || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//         return res.status(404).json({ message: "Invalid User ID" });
//     }
//     const user = await User.findById(req.params.id).select("-password");
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error in getUserById:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const deleteUser = async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// };

// const transferOfficer = async (req, res) => {
//   const { newStation } = req.body;
//   await User.findByIdAndUpdate(req.params.id, { station: newStation });
//   res.json({ message: `Transferred to ${newStation}` });
// };

// module.exports = {
//   sendOtp,
//   registerUser,
//   loginUser,
//   logoutUser,
//   resetPassword,
//   updateUserProfile,
//   updateUserByAdmin, // ✅ Exported new Admin Update Function
//   getAllUsers,
//   getAllOfficers,
//   getUserById, 
//   deleteUser,
//   transferOfficer,
// };













// const User = require('../models/User');
// const Otp = require('../models/Otp');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const { uploadToCloudinary } = require('../utils/cloudinary'); // Helper

// // ✅ IMPORT EMAIL SERVICE
// const { 
//   sendWelcomeEmail, 
//   sendOtpEmail, 
//   sendAdminAlert, 
//   sendProfileOtpEmail, 
//   sendProfileUpdateSuccessEmail 
// } = require('../utils/emailService');

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// /* =======================
//     🔐 SEND OTP
// ======================= */
// const sendOtp = async (req, res) => {
//   const { email, type } = req.body;
//   if (!email) return res.status(400).json({ message: "Email is required" });

//   try {
//     const userExists = await User.findOne({ email });
    
//     // Existing check for signup
//     if (type === 'signup' && userExists) return res.status(400).json({ message: "User already exists" });
    
//     // ✅ Updated check: Forgot Password OR Profile Edit requires user to exist
//     if ((type === 'forgot' || type === 'profile_edit') && !userExists) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     await Otp.deleteMany({ email });
//     await Otp.create({ email, otp: otpCode });

//     // ✅ Logic to send specific email based on type
//     if (type === 'profile_edit') {
//       await sendProfileOtpEmail(email, otpCode);
//     } else {
//       await sendOtpEmail(email, otpCode);
//     }
    
//     res.json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("OTP Route Error:", error.message);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// /* =======================
//     📝 REGISTER USER
// ======================= */
// const registerUser = async (req, res) => {
//   try {
//     const { role, title, firstName, lastName, email, password, mobile, gender, station, designation, secretCode, aadhar, otp } = req.body;

//     const otpRecord = await Otp.findOne({ email, otp });
//     if (!otpRecord) return res.status(400).json({ message: "Invalid or Expired OTP" });

//     if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Invalid Police Secret Code" });
//     if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Invalid High Command Code" });

//     if (!/^[0-9]{10}$/.test(mobile)) return res.status(400).json({ message: "Invalid Mobile Number" });
//     if (aadhar && !/^[0-9]{12}$/.test(aadhar)) return res.status(400).json({ message: "Invalid Aadhaar Number" });

//     let idPhotoUrl = "";
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       idPhotoUrl = result.secure_url;
//     } else {
//       return res.status(400).json({ message: "ID Photo upload is required." });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       role, title, firstName, lastName, email, password: hashedPassword, mobile, gender, aadhar, 
//       idPhoto: idPhotoUrl, station, designation
//     });

//     await Otp.deleteMany({ email });

//     const fullName = `${title} ${firstName} ${lastName}`;

//     sendWelcomeEmail(email, fullName, password).catch(err => console.error("Welcome Email Failed", err.message));

//     sendAdminAlert('Signup', { 
//       name: fullName, 
//       email: user.email, 
//       role: user.role, 
//       _id: user._id 
//     }).catch(e => console.error("Admin Alert Failed", e.message));

//     res.status(201).json({
//       _id: user._id,
//       name: fullName,
//       email: user.email,
//       role: user.role,
//       idPhoto: user.idPhoto,
//       station: user.station,
//       designation: user.designation,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* =======================
//     🔑 LOGIN USER
//     (Updated with Hard-coded Admin Access)
// ======================= */
// const loginUser = async (req, res) => {
//   const { email, password, role, secretCode } = req.body;

//   // ✅ 1. HARD-CODED ADMIN CHECK
//   if (role === 'admin') {
//       if (email === "admin@crimetrack.com" && password === "ADMIN_POWER_2025") {
//           return res.json({
//               _id: "ADMIN_ID_STATIC",
//               name: "System Administrator",
//               email: email,
//               role: "admin",
//               idPhoto: "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png", // Default logo
//               token: jwt.sign({ id: "ADMIN_ID_STATIC", role: "admin" }, process.env.JWT_SECRET, { expiresIn: '1d' })
//           });
//       } else {
//           return res.status(401).json({ message: "Invalid Admin Credentials" });
//       }
//   }

//   // ✅ 2. REGULAR USER LOGIN
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Invalid Credentials" });
//   }
//   if (user.role !== role) return res.status(401).json({ message: "Role Mismatch" });

//   if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Wrong Secret Code" });
//   if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Wrong High Command Code" });

//   // Update Online Status on Login
//   await User.findByIdAndUpdate(user._id, { isOnline: true });

//   const fullName = `${user.title} ${user.firstName} ${user.lastName}`;

//   // SEND ADMIN ALERT (OWNER NOTIFICATION)
//   sendAdminAlert('Login', { 
//     name: fullName, 
//     email: user.email, 
//     role: user.role, 
//     _id: user._id 
//   }).catch(e => console.error("Admin Alert Failed", e.message));

//   res.json({
//     _id: user._id,
//     name: fullName,
//     email: user.email,
//     role: user.role,
//     idPhoto: user.idPhoto,
//     station: user.station,
//     designation: user.designation,
//     token: generateToken(user._id),
//   });
// };

// /* =======================
//     🚪 LOGOUT USER
// ======================= */
// const logoutUser = async (req, res) => {
//   try {
//     const userId = req.body.userId || req.params.id; 
    
//     if (userId) {
//       // ✅ Check if it's the static admin ID, in which case we skip DB update
//       if (userId === "ADMIN_ID_STATIC") {
//          return res.json({ message: "Logged out successfully" });
//       }

//       const user = await User.findById(userId);
//       if (user) {
//         // Update DB: Mark Offline & Set Last Seen
//         await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: new Date() });
        
//         const fullName = `${user.title} ${user.firstName} ${user.lastName}`;
        
//         // SEND ADMIN ALERT (OWNER NOTIFICATION)
//         sendAdminAlert('Logout', { 
//           name: fullName, 
//           email: user.email, 
//           role: user.role, 
//           _id: user._id 
//         }).catch(e => console.error("Admin Alert Failed", e.message));
//       }
//     }
//     res.json({ message: "Logged out successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Logout Error" });
//   }
// };

// /* =======================
//     🔄 RESET PASSWORD
// ======================= */
// const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   const otpRecord = await Otp.findOne({ email, otp });
//   if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(newPassword, salt);
//   await User.findOneAndUpdate({ email }, { password: hashedPassword });
//   await Otp.deleteMany({ email });

//   res.json({ message: "Password reset successful" });
// };

// /* =======================
//     ✏️ UPDATE USER PROFILE
//     (User Self-Update with OTP)
// ======================= */
// const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const { 
//       firstName, lastName, mobile, gender, aadhar, 
//       station, designation, secretCode, email, otp 
//     } = req.body;

//     // --- SECURITY CHECKS ---
    
//     // 1. Secret Code Check for Officers
//     if (user.role === 'police' || user.role === 'senior') {
//        if (!secretCode) return res.status(403).json({ message: "Secret Code required for officers" });
       
//        const validCode = user.role === 'police' ? 'POLICE123' : 'HIGHCOMMAND_2025';
//        if (secretCode !== validCode) return res.status(403).json({ message: "Invalid Secret Code" });
//     }

//     // 2. Email Change Verification
//     if (email && email !== user.email) {
//        if (!otp) return res.status(400).json({ message: "OTP required to change email" });
       
//        const otpRecord = await Otp.findOne({ email: email, otp: otp });
//        if (!otpRecord) return res.status(400).json({ message: "Invalid OTP for new email" });
       
//        const emailTaken = await User.findOne({ email });
//        if (emailTaken) return res.status(400).json({ message: "Email already in use" });

//        user.email = email;
//        await Otp.deleteMany({ email: email }); // Clear OTP
//     }

//     // --- UPDATE FIELDS ---
//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (mobile) user.mobile = mobile;
//     if (gender) user.gender = gender;
//     if (aadhar) user.aadhar = aadhar;

//     if (user.role !== 'citizen') {
//        if (station) user.station = station;
//        if (designation) user.designation = designation;
//     }

//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       user.idPhoto = result.secure_url;
//     }

//     const updatedUser = await user.save();

//     // Send Success Email
//     sendProfileUpdateSuccessEmail(updatedUser.email, updatedUser.firstName)
//       .catch(err => console.error("Profile Update Email Failed:", err.message));

//     const fullName = `${updatedUser.title} ${updatedUser.firstName} ${updatedUser.lastName}`;

//     res.json({
//       _id: updatedUser._id,
//       name: fullName,
//       email: updatedUser.email,
//       role: updatedUser.role,
//       idPhoto: updatedUser.idPhoto,
//       station: updatedUser.station,
//       designation: updatedUser.designation,
//       token: generateToken(updatedUser._id), 
//     });

//   } catch (error) {
//     console.error("Update Error:", error.message);
//     res.status(500).json({ message: "Profile Update Failed" });
//   }
// };

// /* =======================
//     🛠️ ADMIN: UPDATE USER (Direct Edit)
//     Allows Admin to update ANY user without OTP/Secret Code
//     ✅ Fixed Validation Issues & Photo Removal
// ======================= */
// const updateUserByAdmin = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const { 
//       title, firstName, lastName, mobile, gender, aadhar, 
//       station, designation, email, removePhoto 
//     } = req.body;

//     // ✅ BACKEND VALIDATIONS (Prevent invalid formats via Postman/API)
//     if (firstName && !/^[a-zA-Z\s]+$/.test(firstName)) {
//         return res.status(400).json({ message: "First Name must contain alphabets only." });
//     }
//     if (lastName && !/^[a-zA-Z\s]+$/.test(lastName)) {
//         return res.status(400).json({ message: "Last Name must contain alphabets only." });
//     }
//     if (mobile && !/^\d{10}$/.test(mobile)) {
//         return res.status(400).json({ message: "Mobile must be exactly 10 digits." });
//     }
//     if (aadhar && !/^\d{12}$/.test(aadhar)) {
//         return res.status(400).json({ message: "Aadhaar must be exactly 12 digits." });
//     }

//     // Direct Updates
//     if (title) user.title = title; // ✅ Ensure Title is updated
//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (mobile) user.mobile = mobile;
//     if (gender) user.gender = gender;
//     if (aadhar) user.aadhar = aadhar;
//     if (email) user.email = email;
    
//     // Officer Specifics
//     if (station) user.station = station;
//     if (designation) user.designation = designation;

//     // ✅ Handle Photo Removal
//     if (removePhoto === "true") {
//         // Set a secure default image URL
//         user.idPhoto = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1/default-avatar.png"; 
//     } 
//     // Handle Photo Upload
//     else if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       user.idPhoto = result.secure_url;
//     }

//     // ✅ Bypass Mongoose Validation for required fields that aren't changing (Fixes "title is required" error)
//     const updatedUser = await user.save({ validateBeforeSave: false }); 
    
//     res.json(updatedUser);

//   } catch (error) {
//     console.error("Admin Update Error:", error.message);
//     res.status(500).json({ message: "Update Failed: " + error.message });
//   }
// };

// /* =======================
//     📋 GET ALL USERS
// ======================= */
// const getAllUsers = async (req, res) => {
//   try {
//     const { role } = req.query;
//     const query = {};
//     if (role) {
//       query.role = role;
//     }
//     const users = await User.find(query).select('-password');
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* =======================
//     👮 OTHER CONTROLLERS
// ======================= */
// const getAllOfficers = async (req, res) => {
//   const officers = await User.find({ role: { $in: ['police', 'senior'] } }).select('-password');
//   res.json(officers);
// };

// const getUserById = async (req, res) => {
//   try {
//     if (!req.params.id || req.params.id === "undefined" || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//         return res.status(404).json({ message: "Invalid User ID" });
//     }
//     const user = await User.findById(req.params.id).select("-password");
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error in getUserById:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const deleteUser = async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// };

// const transferOfficer = async (req, res) => {
//   const { newStation } = req.body;
//   await User.findByIdAndUpdate(req.params.id, { station: newStation });
//   res.json({ message: `Transferred to ${newStation}` });
// };

// module.exports = {
//   sendOtp,
//   registerUser,
//   loginUser,
//   logoutUser,
//   resetPassword,
//   updateUserProfile,
//   updateUserByAdmin, // ✅ Exported new Admin Update Function
//   getAllUsers,
//   getAllOfficers,
//   getUserById, 
//   deleteUser,
//   transferOfficer,
// };



























































































































































































// const User = require('../models/User');
// const Otp = require('../models/Otp');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const axios = require('axios');
// const { uploadToCloudinary } = require('../utils/cloudinary'); // Helper

// // ✅ IMPORT EMAIL SERVICE
// const { 
//   sendWelcomeEmail, 
//   sendOtpEmail, 
//   sendAdminAlert, 
//   sendProfileOtpEmail, 
//   sendProfileUpdateSuccessEmail 
// } = require('../utils/emailService');

// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

// /* =======================
//     🔐 SEND OTP
// ======================= */
// const sendOtp = async (req, res) => {
//   const { email, type } = req.body;
//   if (!email) return res.status(400).json({ message: "Email is required" });

//   try {
//     const userExists = await User.findOne({ email });
    
//     // Existing check for signup
//     if (type === 'signup' && userExists) return res.status(400).json({ message: "User already exists" });
    
//     // ✅ Updated check: Forgot Password OR Profile Edit requires user to exist
//     if ((type === 'forgot' || type === 'profile_edit') && !userExists) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
//     await Otp.deleteMany({ email });
//     await Otp.create({ email, otp: otpCode });

//     // ✅ Logic to send specific email based on type
//     if (type === 'profile_edit') {
//       await sendProfileOtpEmail(email, otpCode);
//     } else {
//       await sendOtpEmail(email, otpCode);
//     }
    
//     res.json({ message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("OTP Route Error:", error.message);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// /* =======================
//     📝 REGISTER USER
// ======================= */
// const registerUser = async (req, res) => {
//   try {
//     const { role, title, firstName, lastName, email, password, mobile, gender, station, designation, secretCode, aadhar, otp } = req.body;

//     const otpRecord = await Otp.findOne({ email, otp });
//     if (!otpRecord) return res.status(400).json({ message: "Invalid or Expired OTP" });

//     if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Invalid Police Secret Code" });
//     if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Invalid High Command Code" });

//     if (!/^[0-9]{10}$/.test(mobile)) return res.status(400).json({ message: "Invalid Mobile Number" });
//     if (aadhar && !/^[0-9]{12}$/.test(aadhar)) return res.status(400).json({ message: "Invalid Aadhaar Number" });

//     let idPhotoUrl = "";
//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       idPhotoUrl = result.secure_url;
//     } else {
//       return res.status(400).json({ message: "ID Photo upload is required." });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       role, title, firstName, lastName, email, password: hashedPassword, mobile, gender, aadhar, 
//       idPhoto: idPhotoUrl, station, designation
//     });

//     await Otp.deleteMany({ email });

//     const fullName = `${title} ${firstName} ${lastName}`;

//     sendWelcomeEmail(email, fullName, password).catch(err => console.error("Welcome Email Failed", err.message));

//     sendAdminAlert('Signup', { 
//       name: fullName, 
//       email: user.email, 
//       role: user.role, 
//       _id: user._id 
//     }).catch(e => console.error("Admin Alert Failed", e.message));

//     res.status(201).json({
//       _id: user._id,
//       name: fullName,
//       email: user.email,
//       role: user.role,
//       idPhoto: user.idPhoto,
//       station: user.station,
//       designation: user.designation,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* =======================
//     🔑 LOGIN USER
//     (Updated with Hard-coded Admin Access)
// ======================= */
// const loginUser = async (req, res) => {
//   const { email, password, role, secretCode } = req.body;

//   // ✅ 1. HARD-CODED ADMIN CHECK
//   if (role === 'admin') {
//       if (email === "admin@crimetrack.com" && password === "ADMIN_POWER_2025") {
//           return res.json({
//               _id: "ADMIN_ID_STATIC",
//               name: "System Administrator",
//               email: email,
//               role: "admin",
//               idPhoto: "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png", // Default logo
//               token: jwt.sign({ id: "ADMIN_ID_STATIC", role: "admin" }, process.env.JWT_SECRET, { expiresIn: '1d' })
//           });
//       } else {
//           return res.status(401).json({ message: "Invalid Admin Credentials" });
//       }
//   }

//   // ✅ 2. REGULAR USER LOGIN
//   const user = await User.findOne({ email });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: "Invalid Credentials" });
//   }
//   if (user.role !== role) return res.status(401).json({ message: "Role Mismatch" });

//   if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Wrong Secret Code" });
//   if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Wrong High Command Code" });

//   // Update Online Status on Login
//   await User.findByIdAndUpdate(user._id, { isOnline: true });

//   const fullName = `${user.title} ${user.firstName} ${user.lastName}`;

//   // SEND ADMIN ALERT (OWNER NOTIFICATION)
//   sendAdminAlert('Login', { 
//     name: fullName, 
//     email: user.email, 
//     role: user.role, 
//     _id: user._id 
//   }).catch(e => console.error("Admin Alert Failed", e.message));

//   res.json({
//     _id: user._id,
//     name: fullName,
//     email: user.email,
//     role: user.role,
//     idPhoto: user.idPhoto,
//     station: user.station,
//     designation: user.designation,
//     token: generateToken(user._id),
//   });
// };

// /* =======================
//     🚪 LOGOUT USER
// ======================= */
// const logoutUser = async (req, res) => {
//   try {
//     const userId = req.body.userId || req.params.id; 
    
//     if (userId) {
//       // ✅ Check if it's the static admin ID, in which case we skip DB update
//       if (userId === "ADMIN_ID_STATIC") {
//          return res.json({ message: "Logged out successfully" });
//       }

//       const user = await User.findById(userId);
//       if (user) {
//         // Update DB: Mark Offline & Set Last Seen
//         await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: new Date() });
        
//         const fullName = `${user.title} ${user.firstName} ${user.lastName}`;
        
//         // SEND ADMIN ALERT (OWNER NOTIFICATION)
//         sendAdminAlert('Logout', { 
//           name: fullName, 
//           email: user.email, 
//           role: user.role, 
//           _id: user._id 
//         }).catch(e => console.error("Admin Alert Failed", e.message));
//       }
//     }
//     res.json({ message: "Logged out successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Logout Error" });
//   }
// };

// /* =======================
//     🔄 RESET PASSWORD
// ======================= */
// const resetPassword = async (req, res) => {
//   const { email, otp, newPassword } = req.body;
//   const otpRecord = await Otp.findOne({ email, otp });
//   if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(newPassword, salt);
//   await User.findOneAndUpdate({ email }, { password: hashedPassword });
//   await Otp.deleteMany({ email });

//   res.json({ message: "Password reset successful" });
// };

// /* =======================
//     ✏️ UPDATE USER PROFILE
//     (User Self-Update with OTP)
// ======================= */
// const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const { 
//       firstName, lastName, mobile, gender, aadhar, 
//       station, designation, secretCode, email, otp 
//     } = req.body;

//     // --- SECURITY CHECKS ---
    
//     // 1. Secret Code Check for Officers
//     if (user.role === 'police' || user.role === 'senior') {
//        if (!secretCode) return res.status(403).json({ message: "Secret Code required for officers" });
       
//        const validCode = user.role === 'police' ? 'POLICE123' : 'HIGHCOMMAND_2025';
//        if (secretCode !== validCode) return res.status(403).json({ message: "Invalid Secret Code" });
//     }

//     // 2. Email Change Verification
//     if (email && email !== user.email) {
//        if (!otp) return res.status(400).json({ message: "OTP required to change email" });
       
//        const otpRecord = await Otp.findOne({ email: email, otp: otp });
//        if (!otpRecord) return res.status(400).json({ message: "Invalid OTP for new email" });
       
//        const emailTaken = await User.findOne({ email });
//        if (emailTaken) return res.status(400).json({ message: "Email already in use" });

//        user.email = email;
//        await Otp.deleteMany({ email: email }); // Clear OTP
//     }

//     // --- UPDATE FIELDS ---
//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (mobile) user.mobile = mobile;
//     if (gender) user.gender = gender;
//     if (aadhar) user.aadhar = aadhar;

//     if (user.role !== 'citizen') {
//        if (station) user.station = station;
//        if (designation) user.designation = designation;
//     }

//     if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       user.idPhoto = result.secure_url;
//     }

//     const updatedUser = await user.save();

//     // Send Success Email
//     sendProfileUpdateSuccessEmail(updatedUser.email, updatedUser.firstName)
//       .catch(err => console.error("Profile Update Email Failed:", err.message));

//     const fullName = `${updatedUser.title} ${updatedUser.firstName} ${updatedUser.lastName}`;

//     res.json({
//       _id: updatedUser._id,
//       name: fullName,
//       email: updatedUser.email,
//       role: updatedUser.role,
//       idPhoto: updatedUser.idPhoto,
//       station: updatedUser.station,
//       designation: updatedUser.designation,
//       token: generateToken(updatedUser._id), 
//     });

//   } catch (error) {
//     console.error("Update Error:", error.message);
//     res.status(500).json({ message: "Profile Update Failed" });
//   }
// };

// /* =======================
//     🛠️ ADMIN: UPDATE USER (Direct Edit)
//     Allows Admin to update ANY user without OTP/Secret Code
//     ✅ Fixed Validation Issues & Photo Removal
// ======================= */
// const updateUserByAdmin = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const { 
//       title, firstName, lastName, mobile, gender, aadhar, 
//       station, designation, email, removePhoto 
//     } = req.body;

//     // ✅ BACKEND VALIDATIONS (Prevent invalid formats via Postman/API)
//     if (firstName && !/^[a-zA-Z\s]+$/.test(firstName)) {
//         return res.status(400).json({ message: "First Name must contain alphabets only." });
//     }
//     if (lastName && !/^[a-zA-Z\s]+$/.test(lastName)) {
//         return res.status(400).json({ message: "Last Name must contain alphabets only." });
//     }
//     if (mobile && !/^\d{10}$/.test(mobile)) {
//         return res.status(400).json({ message: "Mobile must be exactly 10 digits." });
//     }
//     if (aadhar && !/^\d{12}$/.test(aadhar)) {
//         return res.status(400).json({ message: "Aadhaar must be exactly 12 digits." });
//     }

//     // Direct Updates
//     if (title) user.title = title; // ✅ Ensure Title is updated
//     if (firstName) user.firstName = firstName;
//     if (lastName) user.lastName = lastName;
//     if (mobile) user.mobile = mobile;
//     if (gender) user.gender = gender;
//     if (aadhar) user.aadhar = aadhar;
//     if (email) user.email = email;
    
//     // Officer Specifics
//     if (station) user.station = station;
//     if (designation) user.designation = designation;

//     // ✅ Handle Photo Removal
//     if (removePhoto === "true") {
//         // Set a secure default image URL
//         user.idPhoto = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1/default-avatar.png"; 
//     } 
//     // Handle Photo Upload
//     else if (req.file) {
//       const result = await uploadToCloudinary(req.file.buffer);
//       user.idPhoto = result.secure_url;
//     }

//     // ✅ Bypass Mongoose Validation for required fields that aren't changing (Fixes "title is required" error)
//     const updatedUser = await user.save({ validateBeforeSave: false }); 
    
//     res.json(updatedUser);

//   } catch (error) {
//     console.error("Admin Update Error:", error.message);
//     res.status(500).json({ message: "Update Failed: " + error.message });
//   }
// };

// /* =======================
//     📋 GET ALL USERS (Merged 1.2 Multi-Role Logic)
// ======================= */
// const getAllUsers = async (req, res) => {
//   try {
//     const { role } = req.query;
//     const query = {};
    
//     if (role) {
//       // ✅ LOGIC FROM 1.2: Split by comma to support multiple roles
//       const rolesArray = role.split(','); 
//       query.role = { $in: rolesArray };
//     }
    
//     const users = await User.find(query).select('-password');
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// /* =======================
//     👮 OTHER CONTROLLERS
// ======================= */
// const getAllOfficers = async (req, res) => {
//   const officers = await User.find({ role: { $in: ['police', 'senior'] } }).select('-password');
//   res.json(officers);
// };

// const getUserById = async (req, res) => {
//   try {
//     if (!req.params.id || req.params.id === "undefined" || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
//         return res.status(404).json({ message: "Invalid User ID" });
//     }
//     const user = await User.findById(req.params.id).select("-password");
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error in getUserById:", error.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const deleteUser = async (req, res) => {
//   await User.findByIdAndDelete(req.params.id);
//   res.json({ message: "Deleted" });
// };

// const transferOfficer = async (req, res) => {
//   const { newStation } = req.body;
//   await User.findByIdAndUpdate(req.params.id, { station: newStation });
//   res.json({ message: `Transferred to ${newStation}` });
// };

// module.exports = {
//   sendOtp,
//   registerUser,
//   loginUser,
//   logoutUser, 
//   resetPassword,
//   updateUserProfile,
//   updateUserByAdmin, 
//   getAllUsers,
//   getAllOfficers,
//   getUserById, 
//   deleteUser,
//   transferOfficer,
// };

























const User = require('../models/User');
const Otp = require('../models/Otp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { uploadToCloudinary } = require('../utils/cloudinary'); // Helper

// ✅ IMPORT EMAIL SERVICE
const { 
  sendWelcomeEmail, 
  sendOtpEmail, 
  sendAdminAlert, 
  sendProfileOtpEmail, 
  sendProfileUpdateSuccessEmail 
} = require('../utils/emailService');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

/* =======================
    🔐 SEND OTP
======================= */
const sendOtp = async (req, res) => {
  const { email, type } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const userExists = await User.findOne({ email });
    
    // Existing check for signup
    if (type === 'signup' && userExists) return res.status(400).json({ message: "User already exists" });
    
    // ✅ Updated check: Forgot Password OR Profile Edit requires user to exist
    if ((type === 'forgot' || type === 'profile_edit') && !userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ email });
    await Otp.create({ email, otp: otpCode });

    // ✅ Logic to send specific email based on type
    if (type === 'profile_edit') {
      await sendProfileOtpEmail(email, otpCode);
    } else {
      await sendOtpEmail(email, otpCode);
    }
    
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP Route Error:", error.message);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

/* =======================
    📝 REGISTER USER
======================= */
const registerUser = async (req, res) => {
  try {
    const { role, title, firstName, lastName, email, password, mobile, gender, station, designation, secretCode, aadhar, otp } = req.body;

    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) return res.status(400).json({ message: "Invalid or Expired OTP" });

    if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Invalid Police Secret Code" });
    if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Invalid High Command Code" });

    if (!/^[0-9]{10}$/.test(mobile)) return res.status(400).json({ message: "Invalid Mobile Number" });
    if (aadhar && !/^[0-9]{12}$/.test(aadhar)) return res.status(400).json({ message: "Invalid Aadhaar Number" });

    let idPhotoUrl = "";
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      idPhotoUrl = result.secure_url;
    } else {
      return res.status(400).json({ message: "ID Photo upload is required." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      role, title, firstName, lastName, email, password: hashedPassword, mobile, gender, aadhar, 
      idPhoto: idPhotoUrl, station, designation
    });

    await Otp.deleteMany({ email });

    const fullName = `${title} ${firstName} ${lastName}`;

    sendWelcomeEmail(email, fullName, password).catch(err => console.error("Welcome Email Failed", err.message));

    sendAdminAlert('Signup', { 
      name: fullName, 
      email: user.email, 
      role: user.role, 
      _id: user._id 
    }).catch(e => console.error("Admin Alert Failed", e.message));

    res.status(201).json({
      _id: user._id,
      name: fullName,
      title: user.title,         // ✅ ADDED
      firstName: user.firstName, // ✅ ADDED
      lastName: user.lastName,   // ✅ ADDED
      email: user.email,
      role: user.role,
      mobile: user.mobile,       // ✅ ADDED
      gender: user.gender,       // ✅ ADDED
      aadhar: user.aadhar,       // ✅ ADDED
      idPhoto: user.idPhoto,
      station: user.station,
      designation: user.designation,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =======================
    🔑 LOGIN USER
    (Updated with Hard-coded Admin Access)
======================= */
const loginUser = async (req, res) => {
  const { email, password, role, secretCode } = req.body;

  // ✅ 1. HARD-CODED ADMIN CHECK
  if (role === 'admin') {
      if (email === "admin@crimetrack.com" && password === "ADMIN_POWER_2025") {
          return res.json({
              _id: "ADMIN_ID_STATIC",
              name: "System Administrator",
              email: email,
              role: "admin",
              idPhoto: "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png", // Default logo
              token: jwt.sign({ id: "ADMIN_ID_STATIC", role: "admin" }, process.env.JWT_SECRET, { expiresIn: '1d' })
          });
      } else {
          return res.status(401).json({ message: "Invalid Admin Credentials" });
      }
  }

  // ✅ 2. REGULAR USER LOGIN
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  if (user.role !== role) return res.status(401).json({ message: "Role Mismatch" });

  if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Wrong Secret Code" });
  if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Wrong High Command Code" });

  // Update Online Status on Login
  await User.findByIdAndUpdate(user._id, { isOnline: true });

  const fullName = `${user.title} ${user.firstName} ${user.lastName}`;

  // SEND ADMIN ALERT (OWNER NOTIFICATION)
  sendAdminAlert('Login', { 
    name: fullName, 
    email: user.email, 
    role: user.role, 
    _id: user._id 
  }).catch(e => console.error("Admin Alert Failed", e.message));

  res.json({
    _id: user._id,
    name: fullName,
    title: user.title,         // ✅ ADDED
    firstName: user.firstName, // ✅ ADDED
    lastName: user.lastName,   // ✅ ADDED
    email: user.email,
    role: user.role,
    mobile: user.mobile,       // ✅ ADDED
    gender: user.gender,       // ✅ ADDED
    aadhar: user.aadhar,       // ✅ ADDED
    idPhoto: user.idPhoto,
    station: user.station,
    designation: user.designation,
    token: generateToken(user._id),
  });
};

/* =======================
    🚪 LOGOUT USER
======================= */
const logoutUser = async (req, res) => {
  try {
    const userId = req.body.userId || req.params.id; 
    
    if (userId) {
      // ✅ Check if it's the static admin ID, in which case we skip DB update
      if (userId === "ADMIN_ID_STATIC") {
         return res.json({ message: "Logged out successfully" });
      }

      const user = await User.findById(userId);
      if (user) {
        // Update DB: Mark Offline & Set Last Seen
        await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: new Date() });
        
        const fullName = `${user.title} ${user.firstName} ${user.lastName}`;
        
        // SEND ADMIN ALERT (OWNER NOTIFICATION)
        sendAdminAlert('Logout', { 
          name: fullName, 
          email: user.email, 
          role: user.role, 
          _id: user._id 
        }).catch(e => console.error("Admin Alert Failed", e.message));
      }
    }
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout Error" });
  }
};

/* =======================
    🔄 RESET PASSWORD
======================= */
const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const otpRecord = await Otp.findOne({ email, otp });
  if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  await User.findOneAndUpdate({ email }, { password: hashedPassword });
  await Otp.deleteMany({ email });

  res.json({ message: "Password reset successful" });
};

/* =======================
    ✏️ UPDATE USER PROFILE
    (User Self-Update with OTP)
======================= */
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { 
      firstName, lastName, mobile, gender, aadhar, 
      station, designation, secretCode, email, otp 
    } = req.body;

    // --- SECURITY CHECKS ---
    
    // 1. Secret Code Check for Officers
    if (user.role === 'police' || user.role === 'senior') {
       if (!secretCode) return res.status(403).json({ message: "Secret Code required for officers" });
       
       const validCode = user.role === 'police' ? 'POLICE123' : 'HIGHCOMMAND_2025';
       if (secretCode !== validCode) return res.status(403).json({ message: "Invalid Secret Code" });
    }

    // 2. Email Change Verification
    if (email && email !== user.email) {
       if (!otp) return res.status(400).json({ message: "OTP required to change email" });
       
       const otpRecord = await Otp.findOne({ email: email, otp: otp });
       if (!otpRecord) return res.status(400).json({ message: "Invalid OTP for new email" });
       
       const emailTaken = await User.findOne({ email });
       if (emailTaken) return res.status(400).json({ message: "Email already in use" });

       user.email = email;
       await Otp.deleteMany({ email: email }); // Clear OTP
    }

    // --- UPDATE FIELDS ---
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (mobile) user.mobile = mobile;
    if (gender) user.gender = gender;
    if (aadhar) user.aadhar = aadhar;

    if (user.role !== 'citizen') {
       if (station) user.station = station;
       if (designation) user.designation = designation;
    }

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      user.idPhoto = result.secure_url;
    }

    const updatedUser = await user.save();

    // Send Success Email
    sendProfileUpdateSuccessEmail(updatedUser.email, updatedUser.firstName)
      .catch(err => console.error("Profile Update Email Failed:", err.message));

    const fullName = `${updatedUser.title} ${updatedUser.firstName} ${updatedUser.lastName}`;

    res.json({
      _id: updatedUser._id,
      name: fullName,
      title: updatedUser.title,         // ✅ ADDED
      firstName: updatedUser.firstName, // ✅ ADDED
      lastName: updatedUser.lastName,   // ✅ ADDED
      email: updatedUser.email,
      role: updatedUser.role,
      mobile: updatedUser.mobile,       // ✅ ADDED
      gender: updatedUser.gender,       // ✅ ADDED
      aadhar: updatedUser.aadhar,       // ✅ ADDED
      idPhoto: updatedUser.idPhoto,
      station: updatedUser.station,
      designation: updatedUser.designation,
      token: generateToken(updatedUser._id), 
    });

  } catch (error) {
    console.error("Update Error:", error.message);
    res.status(500).json({ message: "Profile Update Failed" });
  }
};

/* =======================
    🛠️ ADMIN: UPDATE USER (Direct Edit)
    Allows Admin to update ANY user without OTP/Secret Code
    ✅ Fixed Validation Issues & Photo Removal
======================= */
const updateUserByAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { 
      title, firstName, lastName, mobile, gender, aadhar, 
      station, designation, email, removePhoto 
    } = req.body;

    // ✅ BACKEND VALIDATIONS (Prevent invalid formats via Postman/API)
    if (firstName && !/^[a-zA-Z\s]+$/.test(firstName)) {
        return res.status(400).json({ message: "First Name must contain alphabets only." });
    }
    if (lastName && !/^[a-zA-Z\s]+$/.test(lastName)) {
        return res.status(400).json({ message: "Last Name must contain alphabets only." });
    }
    if (mobile && !/^\d{10}$/.test(mobile)) {
        return res.status(400).json({ message: "Mobile must be exactly 10 digits." });
    }
    if (aadhar && !/^\d{12}$/.test(aadhar)) {
        return res.status(400).json({ message: "Aadhaar must be exactly 12 digits." });
    }

    // Direct Updates
    if (title) user.title = title; // ✅ Ensure Title is updated
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (mobile) user.mobile = mobile;
    if (gender) user.gender = gender;
    if (aadhar) user.aadhar = aadhar;
    if (email) user.email = email;
    
    // Officer Specifics
    if (station) user.station = station;
    if (designation) user.designation = designation;

    // ✅ Handle Photo Removal
    if (removePhoto === "true") {
        // Set a secure default image URL
        user.idPhoto = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1/default-avatar.png"; 
    } 
    // Handle Photo Upload
    else if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      user.idPhoto = result.secure_url;
    }

    // ✅ Bypass Mongoose Validation for required fields that aren't changing (Fixes "title is required" error)
    const updatedUser = await user.save({ validateBeforeSave: false }); 
    
    res.json(updatedUser);

  } catch (error) {
    console.error("Admin Update Error:", error.message);
    res.status(500).json({ message: "Update Failed: " + error.message });
  }
};

/* =======================
    📋 GET ALL USERS (Merged 1.2 Multi-Role Logic)
======================= */
const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const query = {};
    
    if (role) {
      // ✅ LOGIC FROM 1.2: Split by comma to support multiple roles
      const rolesArray = role.split(','); 
      query.role = { $in: rolesArray };
    }
    
    const users = await User.find(query).select('-password');
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

/* =======================
    👮 OTHER CONTROLLERS
======================= */
const getAllOfficers = async (req, res) => {
  const officers = await User.find({ role: { $in: ['police', 'senior'] } }).select('-password');
  res.json(officers);
};

const getUserById = async (req, res) => {
  try {
    if (!req.params.id || req.params.id === "undefined" || !req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({ message: "Invalid User ID" });
    }
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in getUserById:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

const transferOfficer = async (req, res) => {
  const { newStation } = req.body;
  await User.findByIdAndUpdate(req.params.id, { station: newStation });
  res.json({ message: `Transferred to ${newStation}` });
};

module.exports = {
  sendOtp,
  registerUser,
  loginUser,
  logoutUser, 
  resetPassword,
  updateUserProfile,
  updateUserByAdmin, 
  getAllUsers,
  getAllOfficers,
  getUserById, 
  deleteUser,
  transferOfficer,
};