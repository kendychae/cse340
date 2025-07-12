# 📋 Assignment 5 Submission Items

## ✅ **Required Submission Items:**

### **1. GitHub Repository Link**

```
https://github.com/kendychae/cse340
```

### **2. Published/Deployed Web Application Link**

**To get your Render URL:**

1. Go to https://dashboard.render.com/
2. Click on your web service (likely called "cse340" or similar)
3. Copy the URL from the top of the dashboard

**Your URL will look like:**

- `https://cse340.onrender.com`
- `https://cse340-motors.onrender.com`
- `https://cse340-[your-suffix].onrender.com`

### **3. ZIP File**

**File Location:** `C:\Users\kendy\cse340\CSE340-Assignment5-KendyChae.zip`

**To submit:** Upload this ZIP file to your assignment submission portal.

---

## 🧪 **Test Your Deployed Site With These Accounts:**

| Account Type | Email             | Password    | What to Test                                |
| ------------ | ----------------- | ----------- | ------------------------------------------- |
| **Client**   | basic@example.com | password123 | Can access account, cannot access inventory |
| **Employee** | happy@example.com | password123 | Can access account AND inventory management |
| **Admin**    | admin@example.com | password123 | Can access account AND inventory management |

---

## ✅ **Assignment 5 Features Implemented:**

### ✅ **Task 1: Dynamic Header Links**

- Header shows "My Account" when logged out
- Shows "Welcome [Name]" and "Logout" when logged in
- Links completely removed from DOM (not just hidden)

### ✅ **Task 2: Authorization Middleware**

- JWT token validation on protected routes
- Employee/Admin-only access to inventory management
- Proper redirect to login for unauthorized access

### ✅ **Task 3: Account Management View**

- Personalized welcome message
- Role-based inventory management link
- Account update functionality

### ✅ **Task 4: Account Update View**

- Separate forms for account info and password
- Form validation (client and server-side)
- Sticky values on validation errors

### ✅ **Task 5: Route Handlers**

- Complete authentication system
- Registration, login, update, password change
- Proper error handling and success messages

### ✅ **Task 6: Logout Functionality**

- Clears JWT authentication cookie
- Redirects to home page
- Complete session cleanup

---

## 🎯 **Final Submission Checklist:**

- [ ] Copy your Render URL from the dashboard
- [ ] Submit GitHub repository link: `https://github.com/kendychae/cse340`
- [ ] Submit Render deployment URL: `https://[your-service].onrender.com`
- [ ] Upload ZIP file: `CSE340-Assignment5-KendyChae.zip`
- [ ] Test all three accounts work on your deployed site

**You're ready to submit Assignment 5!** 🎉

---

## 📊 **Project Statistics:**

- **Total Files Modified/Created:** 20 files
- **Lines of Code Added:** 1,335 insertions
- **Authentication System:** Complete JWT implementation
- **Database Updates:** Employee account type added
- **Test Accounts:** 3 accounts with different roles
- **Security Features:** Password hashing, JWT tokens, role-based access

**Excellent work! Your Assignment 5 implementation is comprehensive and production-ready.** ✨
