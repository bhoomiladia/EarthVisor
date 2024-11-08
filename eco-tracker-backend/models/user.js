const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// Create a User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
// Add a method to generate an authentication token
userSchema.methods.generateAuthToken = function () {
    // Generate a JWT token that includes the user's id and email
    const token = jwt.sign(
      { userId: this._id, email: this.email },
      process.env.JWT_SECRET, // Secret key for JWT signing
      { expiresIn: '1h' } // Expiry of the token (1 hour)
    );
    return token;
  };
// Adding a method to the user schema to validate password
userSchema.methods.isPasswordValid = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
