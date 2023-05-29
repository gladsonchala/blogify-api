const jwt = require('jsonwebtoken');

// Generate a JWT token
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expiration time
  });
  return token;
};

// Verify the user's authentication
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Export the utility functions
module.exports = {
  generateToken,
  verifyToken,
};
