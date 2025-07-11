const db = require("../database/")
const bcrypt = require("bcryptjs")

/* *****************************
 *   Register new account
 * *************************** */
async function registerAccount(account_firstname, account_lastname, account_email, account_password) {
  try {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(account_password, 10)
    const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password) VALUES ($1, $2, $3, $4) RETURNING *"
    return await db.query(sql, [account_firstname, account_lastname, account_email, hashedPassword])
  } catch (error) {
    return error.message
  }
}

/* **********************
 *   Check for existing email
 * ********************* */
async function checkExistingEmail(account_email) {
  try {
    const sql = "SELECT * FROM account WHERE account_email = $1"
    const email = await db.query(sql, [account_email])
    return email.rowCount
  } catch (error) {
    return error.message
  }
}

/* *****************************
 * Return account data using email address
 * ***************************** */
async function getAccountByEmail(account_email) {
  try {
    const result = await db.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password FROM account WHERE account_email = $1',
      [account_email])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching email found")
  }
}

/* *****************************
 * Return account data using account_id
 * ***************************** */
async function getAccountById(account_id) {
  try {
    const result = await db.query(
      'SELECT account_id, account_firstname, account_lastname, account_email, account_type FROM account WHERE account_id = $1',
      [account_id])
    return result.rows[0]
  } catch (error) {
    return new Error("No matching account found")
  }
}

/* *****************************
 * Update account information
 * ***************************** */
async function updateAccount(account_id, account_firstname, account_lastname, account_email) {
  try {
    const sql = "UPDATE account SET account_firstname = $1, account_lastname = $2, account_email = $3 WHERE account_id = $4 RETURNING *"
    const data = await db.query(sql, [account_firstname, account_lastname, account_email, account_id])
    return data.rows[0]
  } catch (error) {
    console.error("model error: " + error)
  }
}

/* *****************************
 * Update account password
 * ***************************** */
async function updatePassword(account_id, account_password) {
  try {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(account_password, 10)
    const sql = "UPDATE account SET account_password = $1 WHERE account_id = $2 RETURNING *"
    const data = await db.query(sql, [hashedPassword, account_id])
    return data.rows[0]
  } catch (error) {
    console.error("model error: " + error)
  }
}

module.exports = { 
  registerAccount, 
  checkExistingEmail, 
  getAccountByEmail, 
  getAccountById, 
  updateAccount, 
  updatePassword 
}
