const pool = require('./index');
const bcrypt = require('bcryptjs');

async function updatePasswords() {
  try {
    const hash = await bcrypt.hash('password123', 10);
    console.log('Generated hash:', hash);
    
    // Update each account
    const accounts = ['basic@example.com', 'happy@example.com', 'admin@example.com'];
    
    for (const email of accounts) {
      const result = await pool.query(
        'UPDATE account SET account_password = $1 WHERE account_email = $2',
        [hash, email]
      );
      console.log(`Updated ${email}: ${result.rowCount} rows affected`);
    }
    
    console.log('All passwords updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating passwords:', error.message);
    process.exit(1);
  }
}

updatePasswords();
