const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateToken } = require('../utils/auth');

// User registration
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token for the registered user
    const token = generateToken(user._id);

    // Return the token and user details
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
};

module.exports = {
  register,
};


// User login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token for the authenticated user
    const token = generateToken(user._id);

    // Return the token and user details
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while logging in' });
  }
};

module.exports = {
  login,
};
