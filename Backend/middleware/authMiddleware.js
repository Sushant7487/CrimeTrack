const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Token nikalo ("Bearer <token>" se)
      token = req.headers.authorization.split(' ')[1];

      // Decode karo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // User dhoondho aur request object mein daal do
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Agle function pe jao
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };