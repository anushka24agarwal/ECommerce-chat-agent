const { spawn } = require('child_process');

console.log('Starting PartSelect Chat Agent in development mode...');

// Check if .env file exists
const fs = require('fs');
if (!fs.existsSync('.env')) {
  console.error('ERROR: .env file not found!');
  console.log('Please create a .env file with:');
  console.log('DEEPSEEK_API_KEY=your_api_key_here');
  console.log('PORT=3001');
  process.exit(1);
}

// Start the server with nodemon
const nodemon = spawn('npx', ['nodemon', 'server.js'], {
  stdio: 'inherit',
  shell: true
});

nodemon.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
});