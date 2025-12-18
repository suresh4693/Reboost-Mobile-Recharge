const mongoose = require('mongoose');

const rechargeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mobile: { type: String, required: true },
  operator: { type: String, required: true },
  amount: { type: Number, required: true },
  transactionId: { type: String, required: true, unique: true },
  planDetails: {
    data: String,
    calls: String,
    sms: String,
    validity: String
  },
  status: { type: String, enum: ['pending', 'success', 'failed', 'Success', 'Failed'], default: 'success' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recharge', rechargeSchema);