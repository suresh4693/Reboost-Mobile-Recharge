const express = require('express');
const Recharge = require('../models/Recharge');
const Bill = require('../models/Bill');
const auth = require('../middleware/auth');

const router = express.Router();

// Get dashboard stats
router.get('/stats', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get recharge stats
    const totalRecharges = await Recharge.countDocuments({ userId });
    const totalRechargeAmount = await Recharge.aggregate([
      { $match: { userId, status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    // Get bill stats
    const totalBills = await Bill.countDocuments({ userId });
    const totalBillAmount = await Bill.aggregate([
      { $match: { userId, status: 'success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    // Operator usage stats
    const operatorStats = await Recharge.aggregate([
      { $match: { userId, status: 'success' } },
      { $group: { _id: '$operator', count: { $sum: 1 }, amount: { $sum: '$amount' } } },
      { $sort: { count: -1 } }
    ]);
    
    // Monthly spending
    const monthlySpending = await Recharge.aggregate([
      { $match: { userId, status: 'success' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          amount: { $sum: '$amount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalRecharges,
      totalRechargeAmount: totalRechargeAmount[0]?.total || 0,
      totalBills,
      totalBillAmount: totalBillAmount[0]?.total || 0,
      operatorStats,
      monthlySpending
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;