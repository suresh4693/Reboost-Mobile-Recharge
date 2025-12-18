const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Plan = require('./models/Plan');
const Recharge = require('./models/Recharge');

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Plan.deleteMany({});
    await Recharge.deleteMany({});

    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const users = await User.insertMany([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
        mobile: '9876543210'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
        mobile: '9876543211'
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: hashedPassword,
        mobile: '9876543212'
      }
    ]);

    // Create sample plans
    const plans = await Plan.insertMany([
      {
        operator: 'Jio',
        amount: 239,
        validity: '28 days',
        data: '1.5GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        description: 'Popular plan with unlimited calls'
      },
      {
        operator: 'Jio',
        amount: 399,
        validity: '56 days',
        data: '2GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        description: 'Long validity plan'
      },
      {
        operator: 'Airtel',
        amount: 265,
        validity: '28 days',
        data: '1.5GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        description: 'Airtel premium plan'
      },
      {
        operator: 'Airtel',
        amount: 449,
        validity: '56 days',
        data: '2GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        description: 'Extended validity'
      },
      {
        operator: 'VI',
        amount: 179,
        validity: '28 days',
        data: '1GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        description: 'Budget friendly plan'
      },
      {
        operator: 'VI',
        amount: 359,
        validity: '56 days',
        data: '1.5GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        description: 'Value for money'
      },
      {
        operator: 'BSNL',
        amount: 187,
        validity: '28 days',
        data: '1GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        description: 'Government network'
      },
      {
        operator: 'BSNL',
        amount: 319,
        validity: '56 days',
        data: '1.5GB/day',
        calls: 'Unlimited',
        sms: '100/day',
        description: 'Reliable connectivity'
      }
    ]);

    // Create sample recharges
    const recharges = await Recharge.insertMany([
      {
        userId: users[0]._id,
        mobile: '9876543210',
        operator: 'Jio',
        amount: 239,
        status: 'Success',
        transactionId: 'TXN001',
        createdAt: new Date('2024-01-15')
      },
      {
        userId: users[0]._id,
        mobile: '9876543210',
        operator: 'Airtel',
        amount: 265,
        status: 'Success',
        transactionId: 'TXN002',
        createdAt: new Date('2024-01-10')
      },
      {
        userId: users[0]._id,
        mobile: '9876543211',
        operator: 'VI',
        amount: 179,
        status: 'Failed',
        transactionId: 'TXN003',
        createdAt: new Date('2024-01-08')
      },
      {
        userId: users[1]._id,
        mobile: '9876543211',
        operator: 'Jio',
        amount: 399,
        status: 'Success',
        transactionId: 'TXN004',
        createdAt: new Date('2024-01-05')
      },
      {
        userId: users[1]._id,
        mobile: '9876543211',
        operator: 'BSNL',
        amount: 187,
        status: 'Success',
        transactionId: 'TXN005',
        createdAt: new Date('2024-01-03')
      }
    ]);

    console.log('Sample data inserted successfully!');
    console.log(`Created ${users.length} users`);
    console.log(`Created ${plans.length} plans`);
    console.log(`Created ${recharges.length} recharges`);
    
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedData;