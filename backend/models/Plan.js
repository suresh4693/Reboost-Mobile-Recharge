const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  operator: { type: String, required: true },
  amount: { type: Number, required: true },
  validity: { type: String, required: true },
  data: { type: String },
  calls: { type: String, default: 'Unlimited' },
  sms: { type: String, default: '100/day' },
  description: { type: String, required: true },
  popular: { type: Boolean, default: false },
  rating: { type: Number, default: 4.0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Plan', planSchema);