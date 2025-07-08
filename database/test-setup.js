// Simple test to verify database connection and basic queries
const db = require('./index')

async function testDatabaseSetup() {
  try {
    console.log('Testing database connection...')
    
    // Test basic connection
    const timeResult = await db.query('SELECT NOW() as current_time')
    console.log('✅ Database connected successfully!')
    console.log('Current time:', timeResult.rows[0].current_time)
    
    // Test if tables exist
    const tableCheck = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('classification', 'inventory', 'account')
      ORDER BY table_name
    `)
    
    console.log('\n📋 Tables found:')
    tableCheck.rows.forEach(row => {
      console.log(`  - ${row.table_name}`)
    })
    
    if (tableCheck.rows.length < 3) {
      console.log('\n⚠️  WARNING: Not all tables found. Run the database setup script!')
      console.log('   Expected: classification, inventory, account')
    }
    
    // Test classifications
    const classificationResult = await db.query('SELECT * FROM classification ORDER BY classification_name')
    console.log('\n🏷️  Classifications:')
    classificationResult.rows.forEach(row => {
      console.log(`  - ${row.classification_name} (ID: ${row.classification_id})`)
    })
    
    // Test inventory count
    const inventoryCount = await db.query('SELECT COUNT(*) as count FROM inventory')
    console.log(`\n🚗 Total vehicles in inventory: ${inventoryCount.rows[0].count}`)
    
    // Test a sample join query
    const sampleVehicles = await db.query(`
      SELECT i.inv_make, i.inv_model, i.inv_year, c.classification_name
      FROM inventory i
      JOIN classification c ON i.classification_id = c.classification_id
      LIMIT 3
    `)
    
    console.log('\n🔍 Sample vehicles:')
    sampleVehicles.rows.forEach(row => {
      console.log(`  - ${row.inv_year} ${row.inv_make} ${row.inv_model} (${row.classification_name})`)
    })
    
    console.log('\n✅ All database tests passed!')
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message)
    console.error('\nTroubleshooting steps:')
    console.error('1. Check that PostgreSQL is running')
    console.error('2. Verify your .env file has correct DATABASE_URL')
    console.error('3. Make sure the cse340_db4 database exists')
    console.error('4. Run the database setup script (complete_setup.sql)')
  }
}

testDatabaseSetup()
