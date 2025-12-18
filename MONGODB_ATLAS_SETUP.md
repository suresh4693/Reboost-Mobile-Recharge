# MongoDB Atlas Setup Guide for ReBoost

## Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" and create an account
3. Verify your email address

## Step 2: Create a Cluster

1. **Choose Deployment Option**: Select "Shared" (Free tier)
2. **Cloud Provider**: Choose AWS, Google Cloud, or Azure
3. **Region**: Select closest region to your users
4. **Cluster Name**: Use "Cluster0" or "ReBoost-Cluster"
5. Click "Create Cluster" (takes 3-5 minutes)

## Step 3: Configure Database Access

### Create Database User
1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. **Authentication Method**: Password
4. **Username**: `reboost-admin`
5. **Password**: Generate secure password (save it!)
6. **Database User Privileges**: Select "Read and write to any database"
7. Click "Add User"

### Whitelist IP Addresses
1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. **For Development**: Click "Add Current IP Address"
4. **For Production**: Click "Allow Access from Anywhere" (0.0.0.0/0)
5. Click "Confirm"

## Step 4: Get Connection String

1. Go to "Clusters" and click "Connect" on your cluster
2. Select "Connect your application"
3. **Driver**: Node.js
4. **Version**: 4.1 or later
5. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## Step 5: Configure ReBoost Application

### Update Environment Variables

1. **Backend .env file**:
   ```env
   MONGODB_URI=mongodb+srv://reboost-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/reboost?retryWrites=true&w=majority
   JWT_SECRET=reboost_jwt_secret_key_2024_production_secure_random_string_32_chars
   PORT=5000
   NODE_ENV=production
   ```

2. **Replace placeholders**:
   - `YOUR_PASSWORD`: Your database user password
   - `cluster0.xxxxx`: Your actual cluster URL
   - Add database name `reboost` after `.net/`

### For Heroku Deployment
```bash
heroku config:set MONGODB_URI="mongodb+srv://reboost-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/reboost?retryWrites=true&w=majority"
heroku config:set JWT_SECRET="reboost_jwt_secret_key_2024_production_secure_random_string_32_chars"
heroku config:set NODE_ENV=production
```

## Step 6: Database Collections

The application will automatically create these collections:
- **users**: User accounts and authentication
- **plans**: Recharge plans for all operators
- **recharges**: Transaction history for recharges
- **bills**: Bill payment records

## Step 7: Initial Data Seeding

The application automatically seeds initial data:
- **Sample Plans**: 40+ plans for Jio, Airtel, VI, BSNL
- **Demo Users**: Test accounts for development
- **Categories**: Bill payment categories

## Step 8: Verify Connection

### Test Locally
```bash
cd backend
npm install
npm start
```

Look for: ✅ MongoDB Atlas connected successfully

### Test API Endpoints
```bash
# Health check
curl http://localhost:5000/api/plans

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","mobile":"9876543210","password":"password123"}'
```

## Step 9: Production Deployment

### Environment Variables Checklist
- [ ] MONGODB_URI with correct credentials
- [ ] JWT_SECRET (minimum 32 characters)
- [ ] NODE_ENV=production
- [ ] PORT (optional, defaults to 5000)

### Security Best Practices
1. **Strong Passwords**: Use complex database passwords
2. **IP Whitelisting**: Restrict to specific IPs in production
3. **Connection Limits**: Monitor connection usage
4. **Backup Strategy**: Enable automated backups

## Step 10: Monitoring and Maintenance

### Atlas Dashboard
- **Metrics**: Monitor database performance
- **Alerts**: Set up performance alerts
- **Backup**: Configure automated backups
- **Logs**: Review connection and query logs

### Application Monitoring
```javascript
// Add to server.js for connection monitoring
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ Mongoose disconnected from Atlas');
});
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Check username/password in connection string
   - Verify database user exists and has correct permissions

2. **Network Timeout**
   - Check IP whitelist settings
   - Verify network connectivity

3. **Database Not Found**
   - Ensure database name is in connection string
   - Check if collections are created

4. **Connection Limit Exceeded**
   - Monitor active connections in Atlas dashboard
   - Implement connection pooling

### Connection String Examples

**Development**:
```
mongodb+srv://reboost-admin:mypassword@cluster0.abc123.mongodb.net/reboost-dev?retryWrites=true&w=majority
```

**Production**:
```
mongodb+srv://reboost-admin:mypassword@cluster0.abc123.mongodb.net/reboost?retryWrites=true&w=majority
```

## Success Checklist

- [ ] Atlas cluster created and running
- [ ] Database user created with read/write permissions
- [ ] IP addresses whitelisted
- [ ] Connection string configured in application
- [ ] Environment variables set correctly
- [ ] Application connects successfully
- [ ] Initial data seeded
- [ ] All API endpoints working
- [ ] Production deployment successful

## Support

- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/
- **Connection Troubleshooting**: https://docs.atlas.mongodb.com/troubleshoot-connection/
- **Security Best Practices**: https://docs.atlas.mongodb.com/security/