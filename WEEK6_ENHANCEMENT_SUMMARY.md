# Week 6 Enhancement: Customer Reviews & Ratings System

## 🎯 Assignment Requirements Met

✅ **Database Interaction**: New `review` table with foreign key relationships to `inventory` and `account` tables  
✅ **New Models**: `review-model.js` with 7 comprehensive database functions  
✅ **New Controllers**: `reviewController.js` with complete business logic and authorization  
✅ **New Views**: Customer review submission form and admin management interface  
✅ **Best Practices**: Proper MVC architecture, input validation, error handling, and security

## 🏗️ System Architecture

### Database Schema

- **Table**: `public.review` with proper constraints and relationships
- **Indexes**: Optimized for inventory_id and approval status queries
- **Sample Data**: 6 realistic reviews for testing (5 approved, 1 pending)

### MVC Components

#### Models (`models/review-model.js`)

- `getReviewsByInventoryId()` - Fetch approved reviews for a vehicle
- `addReview()` - Submit new customer review
- `getAverageRating()` - Calculate star rating average
- `getPendingReviews()` - Admin function for approval workflow
- `approveReview()` - Admin approval action
- `deleteReview()` - Admin deletion action
- `hasUserReviewed()` - Prevent duplicate reviews per user/vehicle

#### Controllers (`controllers/reviewController.js`)

- `buildAddReview()` - Display review submission form
- `addReview()` - Process review submission with validation
- `buildReviewManagement()` - Admin interface for pending reviews
- `approveReview()` - Admin approval workflow
- `deleteReview()` - Admin deletion workflow

#### Views (`views/reviews/`)

- `add-review.ejs` - Customer review form with star rating and validation
- `management.ejs` - Admin interface for review approval/deletion

### Routing & Security (`routes/reviewRoute.js`)

- Protected routes requiring JWT authentication
- Role-based access control (customers can add, admins can manage)
- Input validation middleware integration

### Integration Points

- **Vehicle Details**: Reviews display on inventory detail pages with average ratings
- **Navigation**: Admin links to review management from inventory management
- **Authentication**: Seamless integration with existing JWT auth system

## ⭐ Features Implemented

### Customer Features

- **Star Ratings**: 1-5 star rating system with visual display
- **Review Submission**: Title and detailed text reviews
- **One Review Policy**: Prevents multiple reviews per user per vehicle
- **Validation**: Client and server-side validation for all inputs

### Admin Features

- **Approval Workflow**: Reviews require admin approval before display
- **Management Interface**: Approve or delete pending reviews
- **Role-Based Access**: Only admins can access review management

### Display Features

- **Average Ratings**: Calculated and displayed on vehicle details
- **Review List**: Approved reviews shown on vehicle detail pages
- **Responsive Design**: Mobile-friendly interface with modern styling

## 🔧 Technical Implementation

### Database Constraints

```sql
rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5)
UNIQUE(inventory_id, account_id)  -- One review per user per vehicle
```

### Validation Rules

- **Rating**: Required, 1-5 stars only
- **Title**: 3-100 characters
- **Review Text**: 10-1000 characters
- **Authorization**: JWT token required, appropriate role validation

### Error Handling

- Database connection error handling
- Input validation with user-friendly messages
- Authorization failure redirects
- Graceful error recovery

## 📁 Files Created/Modified

### New Files

- `models/review-model.js` - Complete review database operations
- `controllers/reviewController.js` - Review business logic
- `routes/reviewRoute.js` - Protected review routing
- `views/reviews/add-review.ejs` - Customer review form
- `views/reviews/management.ejs` - Admin management interface
- `setup-reviews.js` - Database initialization script

### Modified Files

- `server.js` - Added review route registration
- `utilities/validate.js` - Added review validation rules
- `views/inventory/detail.ejs` - Enhanced with review display
- `views/inventory/management.ejs` - Added review management link

## 🚀 Usage Instructions

### For Customers

1. Navigate to any vehicle detail page
2. Click "Write a Review" (if logged in and haven't reviewed yet)
3. Select star rating and write review
4. Submit for admin approval

### For Admins

1. Login with admin account
2. Go to Inventory Management
3. Click "Manage Customer Reviews"
4. Approve or delete pending reviews

## 🧪 Testing Results

- ✅ Database table created successfully
- ✅ Sample data inserted without conflicts
- ✅ Server starts without errors
- ✅ Routes registered and accessible
- ✅ Review system fully integrated

## 📊 Enhancement Impact

This enhancement significantly improves the CSE 340 project by:

- Adding interactive customer engagement features
- Demonstrating advanced database relationships
- Implementing comprehensive admin workflows
- Following professional development best practices
- Creating a scalable review system architecture

---

_Week 6 Customer Reviews & Ratings System successfully implemented with complete MVC architecture, database integration, and best practices compliance._
