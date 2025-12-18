const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const seedData = require('./seedData');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173']
}));
app.use(express.json());

// Connect to MongoDB Atlas
connectDB().then(async () => {
  const User = require('./models/User');
  const Plan = require('./models/Plan');
  
  const userCount = await User.countDocuments();
  const planCount = await Plan.countDocuments();
  
  if (userCount === 0 || planCount === 0) {
    console.log('📊 Seeding database with initial data...');
    await seedData();
    console.log('✅ Database seeded successfully');
  }
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recharge', require('./routes/recharge'));
app.use('/api/bills', require('./routes/bills'));
app.use('/api/plans', require('./routes/plans'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/admin', require('./routes/admin'));

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 ReBoost Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 Ready for real-time users with MongoDB Atlas`);
});