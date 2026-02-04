
const User = require('../models/User');
const Otp = require('../models/Otp');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { uploadToCloudinary } = require('../utils/cloudinary'); // Helper

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

/* =======================
    📧 EMAIL SENDER (BREVO)
======================= */
const sendEmail = async (to, subject, html) => {
  try {
    await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { email: process.env.EMAIL_FROM, name: 'CrimeTrack Security' },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          'api-key': process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'application/json', // ✅ ADDED: Required for Brevo API stability
        },
      }
    );
  } catch (error) {
    // ✅ ADDED: Log specific Brevo error to your terminal for debugging
    console.error("Brevo API Error:", error.response?.data || error.message);
    throw error;
  }
};

/* =======================
    🔐 SEND OTP
======================= */
const sendOtp = async (req, res) => {
  const { email, type } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const userExists = await User.findOne({ email });
    if (type === 'signup' && userExists) return res.status(400).json({ message: "User already exists" });
    if (type === 'forgot' && !userExists) return res.status(404).json({ message: "User not found" });

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.deleteMany({ email });
    await Otp.create({ email, otp: otpCode });

    await sendEmail(email, 'Your OTP - CrimeTrack', `<h1>${otpCode}</h1>`);
    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    // ✅ ADDED: Log the error so you know if it's an API Key or Network issue
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

    res.status(201).json({
      _id: user._id,
      name: `${user.title} ${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
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
======================= */
const loginUser = async (req, res) => {
  const { email, password, role, secretCode } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }
  if (user.role !== role) return res.status(401).json({ message: "Role Mismatch" });

  if (role === 'police' && secretCode !== 'POLICE123') return res.status(401).json({ message: "Wrong Secret Code" });
  if (role === 'senior' && secretCode !== 'HIGHCOMMAND_2025') return res.status(401).json({ message: "Wrong High Command Code" });

  // ✅ Update Online Status on Login
  await User.findByIdAndUpdate(user._id, { isOnline: true });

  res.json({
    _id: user._id,
    name: `${user.title} ${user.firstName} ${user.lastName}`,
    email: user.email,
    role: user.role,
    idPhoto: user.idPhoto,
    station: user.station,
    designation: user.designation,
    token: generateToken(user._id),
  });
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
    📋 GET ALL USERS
======================= */
const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const query = {};
    if (role) {
      query.role = role;
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
  resetPassword,
  getAllUsers,
  getAllOfficers,
  getUserById, 
  deleteUser,
  transferOfficer,
};








