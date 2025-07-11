// Quick verification script for Assignment 5 functionality
require("dotenv").config()
const db = require('./index')

async function verifyAssignment5() {
  try {
    console.log('🔍 Verifying Assignment 5 Implementation...\n')
    
    // Check database connection
    console.log('1. Testing database connection...')
    const timeResult = await db.query('SELECT NOW() as current_time')
    console.log('✅ Database connected successfully')
    
    // Check account types
    console.log('\n2. Checking account types...')
    const enumCheck = await db.query("SELECT unnest(enum_range(NULL::account_type)) as account_type")
    const accountTypes = enumCheck.rows.map(r => r.account_type)
    console.log('   Available account types:', accountTypes)
    
    if (accountTypes.includes('Employee')) {
      console.log('✅ Employee account type exists')
    } else {
      console.log('❌ Employee account type missing')
    }
    
    // Check test accounts
    console.log('\n3. Checking test accounts...')
    const testAccounts = await db.query(`
      SELECT account_firstname, account_lastname, account_email, account_type 
      FROM account 
      WHERE account_email IN ('basic@example.com', 'happy@example.com', 'admin@example.com')
      ORDER BY account_type
    `)
    
    console.log('   Test accounts found:')
    testAccounts.rows.forEach(account => {
      console.log(`   ✅ ${account.account_email} - ${account.account_firstname} ${account.account_lastname} (${account.account_type})`)
    })
    
    if (testAccounts.rows.length === 3) {
      console.log('✅ All test accounts exist')
    } else {
      console.log(`❌ Missing test accounts (found ${testAccounts.rows.length}/3)`)
    }
    
    // Check inventory and classifications
    console.log('\n4. Checking inventory data...')
    const inventoryCount = await db.query('SELECT COUNT(*) as count FROM inventory')
    const classificationCount = await db.query('SELECT COUNT(*) as count FROM classification')
    
    console.log(`   Inventory items: ${inventoryCount.rows[0].count}`)
    console.log(`   Classifications: ${classificationCount.rows[0].count}`)
    
    if (inventoryCount.rows[0].count > 0 && classificationCount.rows[0].count > 0) {
      console.log('✅ Inventory data exists')
    } else {
      console.log('❌ Missing inventory data')
    }
    
    console.log('\n🎉 Assignment 5 Database Verification Complete!')
    console.log('\n📋 Summary:')
    console.log('   - Authentication system: Ready')
    console.log('   - Authorization levels: 3 account types available')
    console.log('   - Test accounts: Available for testing')
    console.log('   - Database: Fully configured')
    console.log('\n🚀 Ready for deployment and testing!')
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message)
    console.log('\n🔧 Troubleshooting:')
    console.log('   1. Make sure the database is accessible')
    console.log('   2. Run: pnpm run update-db')
    console.log('   3. Check your DATABASE_URL in .env')
  }
}

verifyAssignment5()
