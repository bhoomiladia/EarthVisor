const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    createdAt: { type: Date, default: Date.now }
});

// Method to generate an authentication token
UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { userId: this._id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token;
};

// Method to validate password
UserSchema.methods.isPasswordValid = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Create and export the User model
const User = mongoose.model('User', UserSchema);
module.exports = User;
