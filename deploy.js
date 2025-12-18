const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment process...');

try {
  // Build the React app
  console.log('📦 Building React application...');
  execSync('npm run build', { stdio: 'inherit' });

  // Copy build files to backend directory
  console.log('📁 Copying build files to backend...');
  const buildPath = path.join(__dirname, 'build');
  const backendBuildPath = path.join(__dirname, 'backend', 'build');

  // Remove existing build directory in backend
  if (fs.existsSync(backendBuildPath)) {
    fs.rmSync(backendBuildPath, { recursive: true, force: true });
  }

  // Copy build directory
  fs.cpSync(buildPath, backendBuildPath, { recursive: true });

  console.log('✅ Deployment preparation complete!');
  console.log('📋 Next steps:');
  console.log('   1. Set environment variables on your hosting platform');
  console.log('   2. Deploy the backend directory');
  console.log('   3. Ensure MongoDB connection is configured');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}