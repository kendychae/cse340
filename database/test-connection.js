const db = require('./index')

async function testConnection() {
  try {
    const result = await db.query('SELECT NOW()')
    console.log('Database connection successful!')
    console.log('Current time:', result.rows[0].now)
  } catch (error) {
    console.error('Database connection failed:', error)
  }
}

testConnection()
