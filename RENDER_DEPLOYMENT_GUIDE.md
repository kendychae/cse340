# Render.com Deployment Instructions for Assignment 5

## Step 3: Deploy to Render.com

### Prerequisites ✅

- [x] Code committed and pushed to GitHub
- [x] Database already exists on Render
- [x] All environment variables identified

### Deployment Steps:

#### 1. Access Your Render Dashboard

- Go to https://dashboard.render.com/
- Sign in to your account

#### 2. Update Your Web Service

Since you already have a web service deployed, you need to update it:

1. **Find your existing web service** (likely called something like "cse340-motors")
2. **Click on the service name** to open its details
3. **Go to the "Settings" tab**

#### 3. Update Environment Variables

In the Environment section, make sure you have these variables set:

```
NODE_ENV=production
DATABASE_URL=[your existing database URL - should already be set]
SESSION_SECRET=MySecretSessionKey123!@#Production
ACCESS_TOKEN_SECRET=MyJWTSecretKey456$%^ProductionSafe
```

**Important Notes:**

- Keep your existing `DATABASE_URL` - don't change it
- Create strong, unique secrets for production (different from local .env)
- The `PORT` variable is automatically set by Render, don't add it

#### 4. Trigger Manual Deploy

1. **Go to the "Manual Deploy" section**
2. **Click "Deploy latest commit"**
3. **Wait for the build to complete** (will show logs)

#### 5. Update Database with Employee Account Type

After deployment, you need to run the database update:

**Option A: Using Render Shell (Recommended)**

1. In your web service dashboard, go to "Shell"
2. Run: `node database/update-database.js`

**Option B: Using Database Console**

1. Go to your PostgreSQL database in Render
2. Open "Console"
3. Run the SQL commands from `database/update_account_type.sql`

## Step 4: Test Production Deployment

### Your Production URLs:

- **Web Service**: https://[your-service-name].onrender.com
- **GitHub Repo**: https://github.com/kendychae/cse340

### Testing Checklist:

#### Basic Functionality ✅

- [ ] Home page loads correctly
- [ ] Navigation works
- [ ] Vehicle classification pages work
- [ ] Vehicle detail pages work
- [ ] Error handling works (test /error/trigger-error)

#### Authentication Testing ✅

- [ ] Registration form works
- [ ] Login form works with test accounts:
  - basic@example.com / password123 (Client)
  - happy@example.com / password123 (Employee)
  - admin@example.com / password123 (Admin)
- [ ] Header shows correct links when logged in/out
- [ ] Logout functionality works

#### Authorization Testing ✅

- [ ] Client accounts cannot access /inv/ (redirected to login)
- [ ] Employee accounts can access inventory management
- [ ] Admin accounts can access inventory management
- [ ] Account management works for all account types

#### Account Management ✅

- [ ] Account update form works
- [ ] Password change works
- [ ] Form validation works (both client and server side)
- [ ] Success/error messages display correctly

### If You Encounter Issues:

1. **Check Build Logs** in Render dashboard
2. **Check Runtime Logs** for any errors
3. **Verify Environment Variables** are set correctly
4. **Test Database Connection** by accessing any page that uses the database

## Submission Ready!

Once testing is complete, you'll have:

- ✅ **Render.com Production URL**: https://[your-service-name].onrender.com
- ✅ **GitHub Repository URL**: https://github.com/kendychae/cse340

Both URLs will be fully functional and ready for assignment submission!

## Common Issues & Solutions:

### Build Failures:

- Check that all dependencies are in package.json ✅
- Verify Node.js version compatibility ✅

### Runtime Errors:

- Ensure environment variables are set correctly
- Check database connection
- Review application logs in Render dashboard

### Database Issues:

- Make sure the database update script ran successfully
- Verify test accounts exist
- Check database connection string

## Security Notes for Production:

- ✅ Strong JWT and session secrets used
- ✅ Secure cookies enabled in production
- ✅ Environment variables properly configured
- ✅ Database connections secured
