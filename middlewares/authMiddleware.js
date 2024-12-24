// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']; // Bearer <token>
  if (!token) return res.status(403).json({ message: 'Access denied.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;  // Attach user to the request
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Permission denied.' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
