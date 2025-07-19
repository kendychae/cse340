const bcrypt = require('bcryptjs');

const passwords = [
  { email: 'basic@340.edu', password: 'I@mABas1cCl!3nt', role: 'Client' },
  { email: 'happy@340.edu', password: 'I@mAnEmpl0y33', role: 'Employee' },
  { email: 'manager@340.edu', password: 'I@mAnAdm!n1strat0r', role: 'Admin' }
];

async function generateHashesAndSQL() {
  console.log('=== PASSWORD HASHES FOR NEW GRADER ACCOUNTS ===\n');
  
  const hashes = [];
  
  for (const user of passwords) {
    const hash = await bcrypt.hash(user.password, 10);
    hashes.push({ ...user, hash });
    console.log(`${user.email}:`);
    console.log(`  Password: ${user.password}`);
    console.log(`  Hash: ${hash}`);
    console.log('');
  }
  
  console.log('\n=== SQL UPDATE SCRIPT ===\n');
  console.log('-- Updated Grader Account Setup for Render Database');
  console.log('-- Run this in pgAdmin connected to your Render database');
  console.log('-- Insert grader-requested accounts with NEW hashed passwords\n');
  
  console.log('INSERT INTO public.account (');
  console.log('        account_firstname,');
  console.log('        account_lastname,');
  console.log('        account_email,');
  console.log('        account_password,');
  console.log('        account_type');
  console.log('    )');
  console.log('VALUES');
  
  hashes.forEach((user, index) => {
    const firstName = user.email === 'basic@340.edu' ? 'Basic' : 
                     user.email === 'happy@340.edu' ? 'Happy' : 'Manager';
    const lastName = user.email === 'basic@340.edu' ? 'Client' : 
                    user.email === 'happy@340.edu' ? 'Employee' : 'Admin';
    
    console.log(`    (`);
    console.log(`        '${firstName}',`);
    console.log(`        '${lastName}',`);
    console.log(`        '${user.email}',`);
    console.log(`        '${user.hash}',`);
    console.log(`        '${user.role}'`);
    console.log(`    )${index < hashes.length - 1 ? ',' : ''}`);
  });
  
  console.log('ON CONFLICT (account_email) DO UPDATE');
  console.log('SET account_password = EXCLUDED.account_password,');
  console.log('    account_type = EXCLUDED.account_type;');
  console.log('');
  console.log('-- Verify the accounts were created');
  console.log('SELECT account_firstname,');
  console.log('    account_lastname,');
  console.log('    account_email,');
  console.log('    account_type');
  console.log('FROM public.account');
  console.log('WHERE account_email IN (');
  console.log("        'basic@340.edu',");
  console.log("        'happy@340.edu',");
  console.log("        'manager@340.edu'");
  console.log('    );');
}

generateHashesAndSQL().catch(console.error);
