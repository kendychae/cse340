/* ******************************************
 * Grader Account Setup Script
 * This script creates the required accounts for grader access
 * Run this script to add the grader-requested accounts
 *******************************************/

const pool = require('./database/')
const bcrypt = require('bcryptjs')
require('dotenv').config()

async function createGraderAccounts() {
  try {
    console.log('Creating grader-requested accounts...')
    
    // Hash the passwords
    const basicPassword = await bcrypt.hash('I@mABas1cCl!3nt', 10)
    const employeePassword = await bcrypt.hash('I@mAnEmpl0y33', 10)
    const managerPassword = await bcrypt.hash('I@mAnAdm!n1strat0r', 10)
    
    // Insert the required accounts
    await pool.query(`
      INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES
      ('Basic', 'Client', 'basic@340.edu', $1, 'Client'),
      ('Happy', 'Employee', 'happy@340.edu', $2, 'Employee'),  
      ('Manager', 'Admin', 'manager@340.edu', $3, 'Admin')
      ON CONFLICT (account_email) DO UPDATE SET
        account_password = EXCLUDED.account_password,
        account_type = EXCLUDED.account_type;
    `, [basicPassword, employeePassword, managerPassword])
    
    console.log('✓ Grader accounts created successfully!')
    console.log('📧 Accounts available:')
    console.log('  - Basic Client: basic@340.edu / I@mABas1cCl!3nt (Client)')
    console.log('  - Employee: happy@340.edu / I@mAnEmpl0y33 (Employee)')
    console.log('  - Manager: manager@340.edu / I@mAnAdm!n1strat0r (Admin)')
    console.log('🔑 Grader can now access inventory management with manager account')
    
  } catch (error) {
    console.error('❌ Error creating grader accounts:', error)
  } finally {
    process.exit()
  }
}

// Run the setup
createGraderAccounts()
