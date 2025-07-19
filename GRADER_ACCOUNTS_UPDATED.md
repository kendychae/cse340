# GRADER ACCOUNTS - UPDATED

## Updated Login Credentials for Instructors

### Account Access Information

Your CSE340 assignment can be tested using these accounts:

1. **Basic Client Account**

   - Email: `basic@340.edu`
   - Password: `I@mABas1cCl!3nt`
   - Role: Client (basic user access)

2. **Employee Account**

   - Email: `happy@340.edu`
   - Password: `I@mAnEmpl0y33`
   - Role: Employee (inventory management access)

3. **Manager Account**
   - Email: `manager@340.edu`
   - Password: `I@mAnAdm!n1strat0r`
   - Role: Admin (full management access)

## Application URL

- **Live Site**: https://cse340-kendy.onrender.com

## Database Update Status

✅ Local database updated with new password hashes
⚠️ **IMPORTANT**: Render database needs to be updated with the SQL script

## Next Steps for Instructor

1. Log into pgAdmin connected to Render database
2. Run the SQL script from `grader-accounts-render.sql`
3. Test login with the credentials above

## Password Hash Information

The passwords above have been properly hashed using bcrypt with salt rounds = 10.
The SQL file contains the correct hashed values for database insertion.

---

**Note**: These accounts were created specifically for grading purposes per instructor feedback.
