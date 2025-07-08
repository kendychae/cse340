# Quick Setup Guide - Fix Everything

## Step 1: Update your .env file

1. Open your `.env` file
2. Update the DATABASE_URL line with your actual PostgreSQL credentials:
   ```
   DATABASE_URL=postgresql://your_username:your_password@localhost:5432/cse340_db4
   ```
   Common examples:
   - `postgresql://postgres:your_password@localhost:5432/cse340_db4`
   - `postgresql://your_username:your_password@localhost:5432/cse340_db4`

## Step 2: Set up your database

1. Make sure PostgreSQL is running on your computer
2. Create the database `cse340_db4` if it doesn't exist
3. In your database client (pgAdmin, psql, etc.), run the entire script from:
   `database/complete_setup.sql`

## Step 3: Test your setup

Run this command to test if everything is working:

```bash
npm run test-setup
```

This will tell you:

- ✅ If database connection works
- ✅ If all tables exist
- ✅ If data is properly inserted
- ❌ What's wrong if there are issues

## Step 4: Test your application locally

```bash
npm run dev
```

Then visit: http://localhost:3000

## Step 5: For Render deployment

1. Create a PostgreSQL database on Render
2. Run the `complete_setup.sql` script on your Render database
3. Set environment variables in Render:
   - `DATABASE_URL`: [your Render database URL]
   - `NODE_ENV`: `production`

## Common Issues & Solutions

### Issue: "relation does not exist"

- **Solution**: Run the database setup script (`complete_setup.sql`)

### Issue: "database does not exist"

- **Solution**: Create the `cse340_db4` database in PostgreSQL

### Issue: "authentication failed"

- **Solution**: Check your username/password in the .env file

### Issue: "connection refused"

- **Solution**: Make sure PostgreSQL is running

## Files Created/Fixed:

- ✅ `database/complete_setup.sql` - Complete database setup
- ✅ `database/test-setup.js` - Test your database setup
- ✅ `.env.example` - Example environment file
- ✅ Updated package.json with test scripts

## Next Steps:

1. Update your `.env` file with real credentials
2. Run the database setup script
3. Test with `npm run test-setup`
4. Start your app with `npm run dev`
