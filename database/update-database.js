// Script to update database with Employee account type and test users
require("dotenv").config()
const db = require('./index')

async function updateDatabase() {
  try {
    console.log('Checking current account types...')
    
    // Check current enum values
    const enumCheck = await db.query("SELECT unnest(enum_range(NULL::account_type)) as account_type")
    console.log('Current account types:', enumCheck.rows.map(r => r.account_type))
    
    // Check if Employee exists
    const hasEmployee = enumCheck.rows.some(r => r.account_type === 'Employee')
    
    if (!hasEmployee) {
      console.log('Adding Employee account type...')
      await db.query("ALTER TYPE account_type ADD VALUE 'Employee'")
      console.log('✅ Employee account type added')
    } else {
      console.log('✅ Employee account type already exists')
    }
    
    // Check if test accounts exist
    const existingAccounts = await db.query("SELECT account_email FROM account WHERE account_email IN ('happy@example.com', 'admin@example.com', 'basic@example.com')")
    const existingEmails = existingAccounts.rows.map(r => r.account_email)
    
    // Insert test accounts if they don't exist
    const testAccounts = [
      {
        email: 'happy@example.com',
        firstName: 'Happy',
        lastName: 'Employee',
        type: 'Employee'
      },
      {
        email: 'admin@example.com',
        firstName: 'Admin',
        lastName: 'User',
        type: 'Admin'
      },
      {
        email: 'basic@example.com',
        firstName: 'Basic',
        lastName: 'Client',
        type: 'Client'
      }
    ]
    
    for (const account of testAccounts) {
      if (!existingEmails.includes(account.email)) {
        console.log(`Adding test account: ${account.email}`)
        await db.query(
          `INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) 
           VALUES ($1, $2, $3, $4, $5)`,
          [account.firstName, account.lastName, account.email, '$2a$10$cvfzKnz8JOjLXmYz9wMWeO0.dN9/1YJ5c7.i.Z5yGrLDGXXNwJyaG', account.type]
        )
        console.log(`✅ ${account.email} added`)
      } else {
        console.log(`✅ ${account.email} already exists`)
      }
    }
    
    // Show all accounts
    const allAccounts = await db.query("SELECT account_id, account_firstname, account_lastname, account_email, account_type FROM account ORDER BY account_id")
    console.log('\n📋 All accounts:')
    allAccounts.rows.forEach(account => {
      console.log(`  ${account.account_id}: ${account.account_firstname} ${account.account_lastname} (${account.account_email}) - ${account.account_type}`)
    })
    
    console.log('\n✅ Database update completed!')
    console.log('\n🔑 Test account credentials (password for all: password123):')
    console.log('  Client: basic@example.com')
    console.log('  Employee: happy@example.com')
    console.log('  Admin: admin@example.com')
    
  } catch (error) {
    console.error('❌ Database update failed:', error.message)
  }
}

updateDatabase()
