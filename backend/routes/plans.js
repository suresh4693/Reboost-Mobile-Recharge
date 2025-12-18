const express = require('express');
const Plan = require('../models/Plan');

const router = express.Router();

// Get all plans
router.get('/', async (req, res) => {
  try {
    const { operator, minAmount, maxAmount } = req.query;
    let filter = { active: true };
    
    if (operator && operator !== 'All') {
      filter.operator = operator;
    }
    
    if (minAmount || maxAmount) {
      filter.amount = {};
      if (minAmount) filter.amount.$gte = parseInt(minAmount);
      if (maxAmount) filter.amount.$lte = parseInt(maxAmount);
    }

    const plans = await Plan.find(filter).sort({ popular: -1, amount: 1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add new plans
router.post('/add-new', async (req, res) => {
  try {
    const newPlans = [
      // Jio Plans (5 new)
      { operator: 'Jio', amount: 75, validity: '14 days', data: '6GB', calls: 'Unlimited', sms: '100/day', description: 'Short term data pack', popular: false, rating: 4.2, active: true },
      { operator: 'Jio', amount: 349, validity: '28 days', data: '2.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'High data daily pack', popular: true, rating: 4.8, active: true },
      { operator: 'Jio', amount: 479, validity: '56 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Mid-range long validity', popular: false, rating: 4.5, active: true },
      { operator: 'Jio', amount: 1299, validity: '84 days', data: '24GB', calls: 'Unlimited', sms: '3000', description: 'Data booster pack', popular: false, rating: 4.4, active: true },
      { operator: 'Jio', amount: 4199, validity: '365 days', data: '3GB/day', calls: 'Unlimited', sms: '100/day', description: 'Premium annual plan', popular: false, rating: 4.9, active: true },
      
      // Airtel Plans (5 new)
      { operator: 'Airtel', amount: 79, validity: '14 days', data: '6GB', calls: 'Unlimited', sms: '100/day', description: 'Quick data boost', popular: false, rating: 4.1, active: true },
      { operator: 'Airtel', amount: 359, validity: '28 days', data: '2.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Premium daily data', popular: true, rating: 4.7, active: true },
      { operator: 'Airtel', amount: 509, validity: '56 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Extended validity plan', popular: false, rating: 4.4, active: true },
      { operator: 'Airtel', amount: 1349, validity: '84 days', data: '24GB', calls: 'Unlimited', sms: '3000', description: 'Bulk data package', popular: false, rating: 4.3, active: true },
      { operator: 'Airtel', amount: 3359, validity: '365 days', data: '2.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Yearly premium pack', popular: false, rating: 4.8, active: true },
      
      // VI Plans (5 new)
      { operator: 'VI', amount: 85, validity: '14 days', data: '6GB', calls: 'Unlimited', sms: '100/day', description: 'Starter data pack', popular: false, rating: 3.9, active: true },
      { operator: 'VI', amount: 379, validity: '28 days', data: '2.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Heavy data user plan', popular: true, rating: 4.3, active: true },
      { operator: 'VI', amount: 529, validity: '56 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Long term savings', popular: false, rating: 4.0, active: true },
      { operator: 'VI', amount: 1449, validity: '84 days', data: '24GB', calls: 'Unlimited', sms: '3000', description: 'Quarterly data plan', popular: false, rating: 3.8, active: true },
      { operator: 'VI', amount: 3499, validity: '365 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Annual value pack', popular: false, rating: 4.1, active: true },
      
      // BSNL Plans (5 new)
      { operator: 'BSNL', amount: 59, validity: '14 days', data: '6GB', calls: 'Unlimited', sms: '100/day', description: 'Budget data pack', popular: false, rating: 3.7, active: true },
      { operator: 'BSNL', amount: 289, validity: '28 days', data: '2.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Affordable high data', popular: true, rating: 4.0, active: true },
      { operator: 'BSNL', amount: 429, validity: '56 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Economic long validity', popular: false, rating: 3.8, active: true },
      { operator: 'BSNL', amount: 1199, validity: '84 days', data: '24GB', calls: 'Unlimited', sms: '3000', description: 'Value data package', popular: false, rating: 3.9, active: true },
      { operator: 'BSNL', amount: 2399, validity: '365 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Most affordable annual', popular: false, rating: 4.2, active: true }
    ];

    await Plan.insertMany(newPlans);
    res.json({ message: `${newPlans.length} new plans added successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Seed plans (for development)
router.post('/seed', async (req, res) => {
  try {
    await Plan.deleteMany({});
    
    const plans = [
      // Jio Plans
      { operator: 'Jio', amount: 149, validity: '28 days', data: '1GB/day', calls: 'Unlimited', sms: '100/day', description: 'Perfect for daily use', popular: false, rating: 4.5, active: true },
      { operator: 'Jio', amount: 239, validity: '28 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Most popular plan', popular: true, rating: 4.7, active: true },
      { operator: 'Jio', amount: 399, validity: '56 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Long validity plan', popular: false, rating: 4.6, active: true },
      { operator: 'Jio', amount: 599, validity: '84 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Extended validity', popular: false, rating: 4.8, active: true },
      { operator: 'Jio', amount: 666, validity: '84 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Value for money', popular: false, rating: 4.4, active: true },
      { operator: 'Jio', amount: 719, validity: '84 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Long term savings', popular: false, rating: 4.3, active: true },
      { operator: 'Jio', amount: 2999, validity: '365 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Annual plan', popular: false, rating: 4.9, active: true },
      
      // Airtel Plans
      { operator: 'Airtel', amount: 155, validity: '28 days', data: '1GB/day', calls: 'Unlimited', sms: '100/day', description: 'Great value for money', popular: false, rating: 4.3, active: true },
      { operator: 'Airtel', amount: 265, validity: '28 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Premium experience', popular: true, rating: 4.6, active: true },
      { operator: 'Airtel', amount: 449, validity: '56 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'High speed data', popular: false, rating: 4.5, active: true },
      { operator: 'Airtel', amount: 549, validity: '70 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Extended benefits', popular: false, rating: 4.4, active: true },
      { operator: 'Airtel', amount: 699, validity: '84 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Long validity offer', popular: false, rating: 4.2, active: true },
      { operator: 'Airtel', amount: 839, validity: '84 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Premium long term', popular: false, rating: 4.7, active: true },
      { operator: 'Airtel', amount: 2998, validity: '365 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Yearly unlimited', popular: false, rating: 4.8, active: true },
      
      // VI Plans
      { operator: 'VI', amount: 179, validity: '28 days', data: '1GB/day', calls: 'Unlimited', sms: '100/day', description: 'Reliable network', popular: false, rating: 4.1, active: true },
      { operator: 'VI', amount: 299, validity: '28 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Enhanced experience', popular: true, rating: 4.2, active: true },
      { operator: 'VI', amount: 479, validity: '56 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Double validity', popular: false, rating: 4.0, active: true },
      { operator: 'VI', amount: 539, validity: '56 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'High data plan', popular: false, rating: 4.3, active: true },
      { operator: 'VI', amount: 719, validity: '84 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Extended plan', popular: false, rating: 3.9, active: true },
      { operator: 'VI', amount: 901, validity: '90 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Quarterly plan', popular: false, rating: 4.1, active: true },
      { operator: 'VI', amount: 3099, validity: '365 days', data: '1.5GB/day', calls: 'Unlimited', sms: '100/day', description: 'Annual savings', popular: false, rating: 4.0, active: true },
      
      // BSNL Plans
      { operator: 'BSNL', amount: 108, validity: '28 days', data: '1GB/day', calls: 'Unlimited', sms: '100/day', description: 'Budget friendly', popular: false, rating: 3.8, active: true },
      { operator: 'BSNL', amount: 187, validity: '28 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'More data plan', popular: true, rating: 3.9, active: true },
      { operator: 'BSNL', amount: 247, validity: '45 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Extended validity', popular: false, rating: 3.7, active: true },
      { operator: 'BSNL', amount: 319, validity: '54 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Long term value', popular: false, rating: 3.6, active: true },
      { operator: 'BSNL', amount: 397, validity: '70 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Best value offer', popular: false, rating: 4.0, active: true },
      { operator: 'BSNL', amount: 499, validity: '80 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Premium budget plan', popular: false, rating: 3.8, active: true },
      { operator: 'BSNL', amount: 1999, validity: '365 days', data: '2GB/day', calls: 'Unlimited', sms: '100/day', description: 'Cheapest annual plan', popular: false, rating: 4.1, active: true }
    ];

    const result = await Plan.insertMany(plans);
    res.json({ message: `${result.length} plans seeded successfully`, count: result.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;