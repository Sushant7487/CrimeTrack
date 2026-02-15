// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     try {
//       // 1. Get Token
//       token = req.headers.authorization.split(' ')[1];

//       // 2. Verify Token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // 3. ✅ ADMIN BYPASS (Static Admin)
//       if (decoded.id === "ADMIN_ID_STATIC") {
//           req.user = { 
//               _id: "ADMIN_ID_STATIC", 
//               role: "admin", 
//               name: "System Administrator",
//               email: "admin@crimetrack.com"
//           };
//           return next();
//       }

//       // 4. ✅ REGULAR USER LOOKUP
//       // Select -password to exclude sensitive data
//       req.user = await User.findById(decoded.id).select('-password');

//       // 5. 🛑 CRITICAL CHECK: If user deleted from DB but token is valid
//       if (!req.user) {
//           return res.status(401).json({ message: 'Not authorized, user not found' });
//       }

//       next();
//     } catch (error) {
//       console.error("Auth Middleware Error:", error.message);
//       res.status(401).json({ message: 'Not authorized, token failed' });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ message: 'Not authorized, no token' });
//   }
// };

// // ✅ ADMIN ROLE CHECK
// const admin = (req, res, next) => {
//   if (req.user && req.user.role === 'admin') {
//     next();
//   } else {
//     res.status(401).json({ message: 'Not authorized as an admin' });
//   }
// };

// module.exports = { protect, admin };
























const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Get Token
      token = req.headers.authorization.split(' ')[1];

      // 2. Verify Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. ✅ ADMIN BYPASS (Static Admin)
      // This matches the logic we preserved in userController.js
      if (decoded.id === "ADMIN_ID_STATIC") {
          req.user = { 
              _id: "ADMIN_ID_STATIC", 
              role: "admin", 
              name: "System Administrator",
              email: "admin@crimetrack.com"
          };
          return next();
      }

      // 4. ✅ REGULAR USER LOOKUP
      // Select -password to exclude sensitive data
      req.user = await User.findById(decoded.id).select('-password');

      // 5. 🛑 CRITICAL CHECK: If user deleted from DB but token is valid
      if (!req.user) {
          return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next();
    } catch (error) {
      console.error("Auth Middleware Error:", error.message);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// ✅ ADMIN ROLE CHECK
// Use this to protect routes meant ONLY for the Admin Dashboard
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };