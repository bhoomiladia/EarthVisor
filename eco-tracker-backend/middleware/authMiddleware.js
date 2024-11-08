// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to verify token
const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header (Bearer token)
  const token = req.headers['authorization']?.split(' ')[1];

  // If there is no token, respond with an error
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  try {
    // Verify the token using the secret key (the same key used when signing the token)
    const decoded = jwt.verify(token, 'your_jwt_secret');
    
    // Attach the decoded user info to the request object (userId, etc.)
    req.user = decoded;

    // Call the next middleware/route handler
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = verifyToken;
