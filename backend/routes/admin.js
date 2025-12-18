const express = require('express');
const User = require('../models/User');
const Bill = require('../models/Bill');
const Recharge = require('../models/Recharge');
const Plan = require('../models/Plan');

const router = express.Router();

// Get all users (without passwords)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json({ count: users.length, users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all bills
router.get('/bills', async (req, res) => {
  try {
    const bills = await Bill.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
    res.json({ count: bills.length, bills });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all recharges
router.get('/recharges', async (req, res) => {
  try {
    const recharges = await Recharge.find({}).populate('userId', 'name email').sort({ createdAt: -1 });
    res.json({ count: recharges.length, recharges });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get database stats
router.get('/stats', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const billCount = await Bill.countDocuments();
    const rechargeCount = await Recharge.countDocuments();
    const planCount = await Plan.countDocuments();
    
    res.json({
      users: userCount,
      bills: billCount,
      recharges: rechargeCount,
      plans: planCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;