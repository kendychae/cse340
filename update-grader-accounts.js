const pool = require('./database/index');
const bcrypt = require('bcryptjs');

async function updateGraderAccounts() {
  try {
    console.log('🔄 Updating grader accounts with new passwords...\n');
    
    const accounts = [
      { email: 'basic@340.edu', password: 'I@mABas1cCl!3nt', type: 'Client', firstName: 'Basic', lastName: 'Client' },
      { email: 'happy@340.edu', password: 'I@mAnEmpl0y33', type: 'Employee', firstName: 'Happy', lastName: 'Employee' },
      { email: 'manager@340.edu', password: 'I@mAnAdm!n1strat0r', type: 'Admin', firstName: 'Manager', lastName: 'Admin' }
    ];
    
    for (const account of accounts) {
      const hashedPassword = await bcrypt.hash(account.password, 10);
      
      const sql = `
        INSERT INTO public.account (
          account_firstname,
          account_lastname,
          account_email,
          account_password,
          account_type
        )
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (account_email) DO UPDATE
        SET account_password = EXCLUDED.account_password,
            account_type = EXCLUDED.account_type
        RETURNING account_id, account_email, account_type;
      `;
      
      const result = await pool.query(sql, [
        account.firstName,
        account.lastName,
        account.email,
        hashedPassword,
        account.type
      ]);
      
      console.log(`✅ Updated ${account.email} (${account.type})`);
      console.log(`   Password: ${account.password}`);
      console.log(`   Account ID: ${result.rows[0].account_id}\n`);
    }
    
    // Verify all accounts
    console.log('🔍 Verifying all grader accounts:\n');
    const verifySQL = `
      SELECT account_id, account_firstname, account_lastname, account_email, account_type, account_password
      FROM public.account
      WHERE account_email IN ('basic@340.edu', 'happy@340.edu', 'manager@340.edu')
      ORDER BY account_email;
    `;
    
    const verification = await pool.query(verifySQL);
    verification.rows.forEach(row => {
      console.log(`📧 ${row.account_email}`);
      console.log(`   Name: ${row.account_firstname} ${row.account_lastname}`);
      console.log(`   Type: ${row.account_type}`);
      console.log(`   ID: ${row.account_id}`);
      console.log(`   Hash: ${row.account_password.substring(0, 20)}...\n`);
    });
    
    console.log('✅ All grader accounts updated successfully!');
    console.log('\n📝 IMPORTANT: Updated credentials for graders:');
    accounts.forEach(account => {
      console.log(`   ${account.email} / ${account.password}`);
    });
    
  } catch (error) {
    console.error('❌ Error updating grader accounts:', error);
  } finally {
    pool.end();
  }
}

updateGraderAccounts();
