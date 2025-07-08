# Render.com Deployment Guide

## Step-by-Step Deployment Process

### 1. **Prepare Your Repository**

- Ensure all code is committed and pushed to GitHub
- Make sure your `.env` file is NOT committed (it should be in `.gitignore`)

### 2. **Set Up Database on Render**

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "PostgreSQL"
3. Fill in database details:
   - Name: `cse340-database`
   - Region: Choose closest to you
   - Plan: Free tier
4. Click "Create Database"
5. Wait for database to be created
6. Copy the "External Database URL" from the database info page

### 3. **Set Up Database Tables**

1. Connect to your database using a PostgreSQL client (like pgAdmin or psql)
2. Run the SQL from `database/rebuild.sql` to create tables and insert data

### 4. **Deploy Web Service**

1. In Render Dashboard, click "New +" → "Web Service"
2. Connect your GitHub repository
3. Fill in service details:
   - **Name**: `cse340-motors`
   - **Region**: Same as database
   - **Branch**: `main` (or your default branch)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 5. **Configure Environment Variables**

In the "Environment" section of your web service:

- Add: `DATABASE_URL` = [paste your database URL from step 2]
- Add: `NODE_ENV` = `production`

### 6. **Deploy**

1. Click "Create Web Service"
2. Wait for deployment to complete
3. Your app will be available at the provided URL

## Troubleshooting Common Issues

### Database Connection Issues

- Make sure `DATABASE_URL` is correctly set in environment variables
- Verify the database URL format: `postgresql://username:password@host:port/database`
- Check that the database is running and accessible

### Build Failures

- Check the build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Runtime Errors

- Check the service logs in Render dashboard
- Look for specific error messages
- Verify all environment variables are set correctly

## Testing After Deployment

1. Visit your deployed URL
2. Test navigation between different vehicle classifications
3. Click on individual vehicles to view details
4. Test the error handling link in the footer
5. Try accessing a non-existent page to test 404 handling

## Common Environment Variables Needed

```
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database
PORT=10000
```

Note: Render automatically sets PORT, so you don't need to set it manually.
