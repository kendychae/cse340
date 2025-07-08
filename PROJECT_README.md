# CSE 340 Motors Project

This is a web application for CSE Motors, built with Node.js, Express, and PostgreSQL.

## Features

- Dynamic navigation based on vehicle classifications
- Vehicle inventory display by classification
- Individual vehicle detail pages
- Error handling with custom error pages
- Responsive design for mobile and desktop
- Database-driven content

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- pnpm package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update database connection string in `.env`

4. Set up the database:
   - Create a PostgreSQL database
   - Run the rebuild script: `database/rebuild.sql`
   - This will create tables and populate sample data

### Running the Application

Development mode:
```bash
pnpm run dev
```

Production mode:
```bash
pnpm start
```

The application will be available at `http://localhost:3000`

## Project Structure

- `controllers/` - Route handlers and business logic
- `models/` - Database interaction layer
- `routes/` - Express route definitions
- `views/` - EJS templates
- `public/` - Static assets (CSS, JS, images)
- `utilities/` - Helper functions and middleware
- `database/` - Database scripts and configuration

## Routes

- `/` - Home page
- `/inv/type/:classificationId` - Vehicle listing by classification
- `/inv/detail/:inventoryId` - Individual vehicle details
- `/account/` - Account management
- `/error/trigger-error` - Test error handling

## Database Schema

The application uses three main tables:
- `classification` - Vehicle categories
- `inventory` - Vehicle inventory data
- `account` - User accounts

## Assignment Requirements

This project fulfills the requirements for CSE 340 Assignment 3:

1. **Task One**: Dynamic inventory classification and detail views
2. **Task Two**: Error handling middleware throughout the application
3. **Task Three**: Intentional error generation for testing

## Testing

Test the application by:
1. Navigating through different vehicle classifications
2. Viewing individual vehicle details
3. Testing error handling with the footer link
4. Checking responsive design on different screen sizes

## Deployment

The application is designed to be deployed on Render.com or similar platforms.
