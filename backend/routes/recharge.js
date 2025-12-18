const express = require('express');
const Recharge = require('../models/Recharge');
const auth = require('../middleware/auth');

const router = express.Router();

// Process recharge
router.post('/', auth, async (req, res) => {
  try {
    const { mobile, operator, amount, transactionId, planDetails } = req.body;
    
    const recharge = new Recharge({
      userId: req.user._id,
      mobile,
      operator,
      amount,
      transactionId,
      planDetails,
      status: 'Success'
    });

    await recharge.save();
    
    res.json({
      success: true,
      transactionId,
      message: 'Recharge successful',
      recharge
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get recharge history
router.get('/history', auth, async (req, res) => {
  try {
    const recharges = await Recharge.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(recharges);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;