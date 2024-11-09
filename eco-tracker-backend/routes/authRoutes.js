const express = require('express');
const User = require('../models/user');
const Company = require('../models/company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
    const { username, email, password, companyId } = req.body;

    // Check if username is already used
    const usedUsername = await User.findOne({ username });
    if (usedUsername) {
        return res.status(400).json({ message: 'Username already used' });
    }

    // Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Check if the specified company exists
    const company = await Company.findById(companyId);
    if (!company) {
        return res.status(404).json({ message: 'Company not found' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        company: companyId
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/auth/login - Authenticate and return JWT token
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check if the password is valid
        const isValidPassword = await user.isPasswordValid(password);
        if (!isValidPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = user.generateAuthToken();
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /api/auth/users/:id - Fetch user and populate company data
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('company', 'name location');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/auth/users - Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude password field
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/auth/by-company-id/:companyId - Fetch users by company ID
router.get('/by-company-id/:companyId', async (req, res) => {
    try {
        const users = await User.find({ company: req.params.companyId }).populate('company');
        if (users.length === 0) {
            return res.status(404).json({ error: 'No users found for this company' });
        }
        res.json(users);
    } catch (err) {
        console.error('Error fetching users by company ID:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
