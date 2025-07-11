# CSE 340 Assignment 5 - Authentication & Authorization

## Overview

This assignment implements comprehensive authentication and authorization functionality for the CSE Motors web application, including JWT tokens, user account management, and role-based access control.

## Features Implemented

### Task 1: Dynamic Header Links

- **My Account/Logout Toggle**: The header dynamically shows "My Account" when not logged in, and "Welcome [FirstName]" + "Logout" when logged in
- **Conditional Rendering**: Links are completely removed from markup (not just hidden) based on login state
- **Welcome Link**: Logged-in users see a welcome link that navigates to account management

### Task 2: Authorization Middleware

- **JWT Token Middleware**: Checks for valid JWT tokens in cookies
- **Account Type Authorization**: Restricts inventory management to Employee and Admin accounts only
- **Login Redirect**: Unauthorized access attempts redirect to login with appropriate messages
- **Public Access Maintained**: Classification and detail views remain accessible to all visitors

### Task 3: Account Management View

- **Client Greeting**: Shows "Welcome [FirstName]" for Client accounts
- **Employee/Admin Features**: Additional inventory management link for Employee/Admin accounts
- **Conditional Content**: Inventory management section only appears for authorized account types
- **Update Account Link**: All users can access account update functionality

### Task 4: Account Update View

- **Dual Form Design**: Separate forms for account information and password updates
- **Account Update Form**:
  - First name, last name, and email fields with sticky values
  - Server-side and client-side validation
  - Hidden account_id field
- **Password Change Form**:
  - New password field with validation requirements
  - Password strength requirements clearly stated
  - Hidden account_id field
- **Form Validation**: Both client-side and server-side validation implemented

### Task 5: Route Handlers & Processing

- **Account Routes**: GET and POST handlers for account update view and processing
- **Update Processing**: Separate handlers for account info and password updates
- **Success/Failure Messages**: Appropriate feedback for all operations
- **Data Validation**: Email uniqueness checking (excluding current user)
- **JWT Token Updates**: Refreshes JWT when account information changes

### Task 6: Logout Functionality

- **Token Deletion**: Clears JWT cookie upon logout
- **Home Redirect**: Returns user to home page after logout
- **Clean State**: Ensures complete logout with no residual authentication

## Technical Implementation

### Database Schema Updates

- **Employee Account Type**: Added 'Employee' to account_type enum
- **Test Accounts**: Created test users for all account types
  - Client: basic@example.com (password: password123)
  - Employee: happy@example.com (password: password123)
  - Admin: admin@example.com (password: password123)

### Authentication System

- **JWT Tokens**: Secure token-based authentication
- **Cookie Storage**: HTTP-only cookies for token storage
- **Password Hashing**: bcryptjs for secure password storage
- **Token Validation**: Middleware for automatic token checking

### Authorization Levels

1. **Public**: Home, classification, and detail views
2. **Authenticated**: Account management, account updates
3. **Employee/Admin**: Inventory management, add vehicles/classifications

### Security Features

- **Password Requirements**: 12+ characters with complexity requirements
- **Email Validation**: Server-side email format and uniqueness checking
- **SQL Injection Protection**: Parameterized queries throughout
- **XSS Protection**: Input sanitization and escaping
- **CSRF Protection**: Form-based submissions with validation

## File Structure

### New Files Created

- `models/account-model.js` - Account database operations
- `controllers/accountController.js` - Account route handlers
- `views/account/update.ejs` - Account update view
- `database/update-database.js` - Database update utility

### Modified Files

- `server.js` - Added cookie-parser and JWT middleware
- `routes/accountRoute.js` - Complete account routing system
- `routes/inventoryRoute.js` - Added authorization middleware
- `utilities/index.js` - JWT and authorization utilities
- `utilities/validate.js` - Account validation rules
- `views/partials/header.ejs` - Dynamic login/logout links
- `views/account/account.ejs` - Account management with role-based content
- `views/account/login.ejs` - Functional login form
- `views/account/register.ejs` - Functional registration form

## Testing Instructions

### 1. Local Testing

```bash
# Start the application
pnpm run dev

# Visit http://localhost:3002
```

### 2. Test Scenarios

#### Account Registration

1. Go to `/account/register`
2. Test validation with invalid data
3. Register a new account
4. Verify login redirect

#### Account Login

1. Use test credentials:
   - basic@example.com / password123 (Client)
   - happy@example.com / password123 (Employee)
   - admin@example.com / password123 (Admin)
2. Verify header changes after login
3. Check account management access

#### Authorization Testing

1. **Client Account**: Should NOT see inventory management
2. **Employee Account**: Should see inventory management links
3. **Admin Account**: Should see inventory management links
4. **Not Logged In**: Should be redirected when accessing `/inv/`

#### Account Updates

1. Login with any account
2. Access account update via management page
3. Test account information updates
4. Test password changes
5. Verify data persistence

#### Logout Testing

1. Login with any account
2. Click logout link
3. Verify redirect to home
4. Verify header shows "My Account" again
5. Try accessing restricted areas (should redirect to login)

### 3. Database Utilities

```bash
# Test database connection
pnpm run test-setup

# Update database with Employee type and test accounts
pnpm run update-db
```

## Production Deployment

### Environment Variables Required

```
NODE_ENV=production
DATABASE_URL=postgresql://your_production_db_url
ACCESS_TOKEN_SECRET=your-secure-jwt-secret
SESSION_SECRET=your-secure-session-secret
```

### Deployment Steps

1. Push all changes to GitHub
2. Deploy to Render.com
3. Set environment variables
4. Run database update script on production database
5. Test all functionality

## Security Considerations

### Production Recommendations

- Use strong, unique secrets for JWT and sessions
- Enable HTTPS (secure: true for cookies)
- Implement rate limiting for login attempts
- Add CSRF tokens for form submissions
- Regular security audits of dependencies

### Password Policy

- Minimum 12 characters
- Must include: uppercase, lowercase, number, special character
- Passwords are hashed using bcryptjs with salt rounds of 10

## Assignment Requirements Met

✅ **Task 1**: Dynamic header with conditional My Account/Logout links  
✅ **Task 2**: JWT middleware with Employee/Admin authorization for inventory  
✅ **Task 3**: Account management with role-based content  
✅ **Task 4**: Account update view with dual forms and validation  
✅ **Task 5**: Complete route handlers and processing logic  
✅ **Task 6**: Logout functionality with cookie clearing

## Error Handling

- Comprehensive error catching throughout the application
- User-friendly error messages
- Validation errors displayed in forms
- Authentication failures handled gracefully
- Authorization failures redirect to login

## Additional Features

- Client-side form validation for better UX
- Sticky form values on validation errors
- Success/failure flash messages
- Responsive design maintained throughout
- WAVE accessibility compliance

This implementation provides a complete, secure authentication and authorization system suitable for production use while meeting all assignment requirements.
