const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

// Define the User schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(this.password, salt);
    // Replace the plain password with the hashed password
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
