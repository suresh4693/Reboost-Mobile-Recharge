const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    
    // Check if user already exists by email or mobile
    const existingUser = await User.findOne({ 
      $or: [{ email }, { mobile }] 
    });
    
    if (existingUser) {
      const field = existingUser.email === email ? 'email' : 'mobile number';
      return res.status(400).json({ 
        message: `User with this ${field} already exists. Please login instead.` 
      });
    }

    const user = new User({ name, email, password, mobile });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallback_secret');
    res.status(201).json({ 
      token, 
      user: { id: user._id, name, email, mobile },
      message: 'Registration successful! Welcome to ReBoost!'
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User already exists with this email or mobile number' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'No account found with this email. Please register first.' });
    }
    
    if (!(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Incorrect password. Please try again.' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallback_secret');
    res.json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email, mobile: user.mobile },
      message: `Welcome back, ${user.name}!`
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    res.json({ user: { id: req.user._id, name: req.user.name, email: req.user.email, mobile: req.user.mobile } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;