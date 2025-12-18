# ReBoost Deployment Guide

## Quick Deployment Steps

### 1. Local Development Setup

```bash
# Clone and setup
git clone <repository-url>
cd ReBoost

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Start development servers
cd ..
npm run dev:full
```

### 2. Production Build

```bash
# Build for production
npm run build:production
```

### 3. Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI="your_mongodb_connection_string"
heroku config:set JWT_SECRET="your_secure_jwt_secret"

# Deploy
git add .
git commit -m "Deploy to production"
git push heroku main

# Open app
heroku open
```

### 4. Deploy to Netlify + Railway/Render

#### Frontend (Netlify)
1. Build the app: `npm run build`
2. Upload `dist` folder to Netlify
3. Set redirects for SPA routing

#### Backend (Railway/Render)
1. Deploy `backend` folder
2. Set environment variables
3. Update frontend API_BASE_URL

### 5. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Environment Variables

### Required Variables
- `NODE_ENV`: production
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Secure random string (min 32 characters)
- `PORT`: Server port (default: 5000)

### MongoDB Setup
1. Create MongoDB Atlas account
2. Create cluster and database
3. Get connection string
4. Whitelist deployment IP addresses

## Post-Deployment Checklist

- [ ] Environment variables set correctly
- [ ] MongoDB connection working
- [ ] API endpoints responding
- [ ] Authentication working
- [ ] Frontend routing working
- [ ] CORS configured properly
- [ ] SSL certificate active

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall
   - Check for missing dependencies

2. **Database Connection**
   - Verify MongoDB URI format
   - Check network access/IP whitelist
   - Ensure database user permissions

3. **API Errors**
   - Check CORS configuration
   - Verify API base URL
   - Check environment variables

4. **Authentication Issues**
   - Verify JWT secret is set
   - Check token expiration
   - Ensure secure cookie settings

### Logs and Debugging

```bash
# Heroku logs
heroku logs --tail

# Local debugging
NODE_ENV=production npm start
```

## Performance Optimization

1. **Frontend**
   - Enable gzip compression
   - Optimize images
   - Code splitting
   - CDN for static assets

2. **Backend**
   - Database indexing
   - Response caching
   - Connection pooling
   - Rate limiting

## Security Considerations

1. **Environment Variables**
   - Never commit .env files
   - Use strong JWT secrets
   - Rotate secrets regularly

2. **Database**
   - Use connection strings with authentication
   - Enable MongoDB security features
   - Regular backups

3. **API Security**
   - Input validation
   - Rate limiting
   - HTTPS only
   - CORS configuration

## Monitoring

1. **Application Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring
   - Uptime monitoring

2. **Database Monitoring**
   - Connection pool metrics
   - Query performance
   - Storage usage

## Backup Strategy

1. **Database Backups**
   - Automated daily backups
   - Point-in-time recovery
   - Cross-region replication

2. **Code Backups**
   - Git repository backups
   - Environment configuration backups