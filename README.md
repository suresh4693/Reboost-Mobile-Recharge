# ReBoost Mobile Recharge Application

A complete MERN stack mobile recharge web application with React frontend, Express.js backend, and MongoDB database.

## Features

- **User Authentication**: JWT-based registration and login
- **Mobile Recharge**: Support for all major operators (Jio, Airtel, VI, BSNL)
- **Bill Payments**: Electricity, Gas, Water, DTH/Cable, Internet, Insurance
- **Transaction History**: Complete transaction tracking
- **Dashboard Analytics**: Visual charts and spending insights
- **Responsive Design**: Professional UI with gray color scheme

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Tailwind CSS
- Recharts (for analytics)
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ReBoost
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ..
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment file
   cd backend
   cp .env.example .env
   
   # Edit .env file with your MongoDB URI and JWT secret
   ```

4. **Start the application**
   ```bash
   # From root directory - starts both frontend and backend
   npm run dev
   
   # Or start separately:
   # Backend (from backend directory)
   npm run dev
   
   # Frontend (from root directory)
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Database Seeding

The application automatically seeds sample data on first run. To manually seed:

```bash
cd backend
npm run seed
```

## Deployment

### Heroku Deployment

1. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your_mongodb_connection_string
   heroku config:set JWT_SECRET=your_jwt_secret
   ```

3. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Environment Variables

- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `NODE_ENV`: Environment (development/production)

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Plans
- `GET /api/plans` - Get recharge plans
- `POST /api/plans/seed` - Seed sample plans

### Recharge
- `POST /api/recharge` - Process recharge
- `GET /api/recharge/history` - Get recharge history

### Bills
- `POST /api/bills/pay` - Pay bill
- `GET /api/bills/history` - Get bill history

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Project Structure

```
ReBoost/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Plan.js
│   │   ├── Recharge.js
│   │   └── Bill.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── plans.js
│   │   ├── recharge.js
│   │   ├── bills.js
│   │   └── dashboard.js
│   ├── .env
│   ├── server.js
│   └── seedData.js
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Recharge.jsx
│   │   ├── Bills.jsx
│   │   ├── History.jsx
│   │   ├── Profile.jsx
│   │   ├── About.jsx
│   │   └── Offers.jsx
│   ├── services/
│   │   └── api.js
│   └── App.jsx
├── package.json
├── Procfile
└── README.md
```

## Features in Detail

### Authentication System
- Secure JWT-based authentication
- Password hashing with bcryptjs
- Protected routes and middleware
- User profile management

### Recharge System
- Support for all major operators
- Plan-based recharge with detailed information
- Real-time plan fetching
- Transaction tracking

### Bill Payment System
- Multiple bill categories
- Provider-specific plans
- Payment processing
- Bill history tracking

### Dashboard Analytics
- Operator usage statistics
- Monthly spending trends
- Transaction distribution
- Visual charts and graphs

### Professional UI
- Clean, corporate design
- Gray color scheme
- Responsive layout
- No emojis for professional appearance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.