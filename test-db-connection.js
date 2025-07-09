// Quick test to check if database connection works
require("dotenv").config()
const db = require('./database/index')

async function testConnection() {
  try {
    console.log('Testing database connection...')
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set')
    
    const result = await db.query('SELECT NOW() as current_time')
    console.log('✅ Database connected successfully!')
    console.log('Current time:', result.rows[0].current_time)
    
    // Test if our tables exist
    const tables = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `)
    
    console.log('📋 Tables found:', tables.rows.map(r => r.table_name))
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
    process.exit(1)
  }
}

testConnection()
