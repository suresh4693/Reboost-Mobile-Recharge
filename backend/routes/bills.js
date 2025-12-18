const express = require('express');
const Bill = require('../models/Bill');
const auth = require('../middleware/auth');

const router = express.Router();

// Pay bill
router.post('/pay', auth, async (req, res) => {
  try {
    const { category, provider, consumerNumber, amount } = req.body;
    
    const transactionId = 'BILL' + Date.now() + Math.random().toString(36).substr(2, 5);
    
    const bill = new Bill({
      userId: req.user._id,
      category,
      provider,
      consumerNumber,
      amount,
      transactionId,
      status: 'success'
    });

    await bill.save();
    
    res.json({
      success: true,
      transactionId,
      message: 'Bill payment successful',
      bill
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get bill history
router.get('/history', auth, async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;