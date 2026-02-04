const express = require("express");
const { getLegalAdvice } = require("../controllers/chatController");
const router = express.Router(); 

router.post("/ask", getLegalAdvice);

module.exports = router; // ✅ Fixed: Changed from 'export default' to 'module.exports'