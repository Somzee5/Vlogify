# Vlogify Setup Guide

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)
- Firebase project (for Google OAuth)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection String
MONGO=mongodb://localhost:27017/vlogify

# JWT Secret Key (generate a strong secret)
JWT_SECRET=your_jwt_secret_key_here

# Node Environment
NODE_ENV=development

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Installation

1. **Install backend dependencies:**
   ```bash
   npm install
   ```

2. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Set up Firebase:**
   - Create a Firebase project
   - Enable Google Authentication
   - Update `client/src/firebase.js` with your Firebase config

4. **Set up Cloudinary:**
   - Create a Cloudinary account
   - Get your cloud name, API key, and API secret
   - Update the environment variables

## Running the Application

1. **Start the backend server:**
   ```bash
   npm run dev
   ```
   This will start the server on http://localhost:3000

2. **Start the frontend development server:**
   ```bash
   cd client
   npm run dev
   ```
   This will start the client on http://localhost:5173

3. **Or run both simultaneously:**
   ```bash
   npm run dev:full
   ```

## Features Fixed

### Authentication Issues
- ✅ Fixed missing `credentials: 'include'` in fetch requests
- ✅ Updated cookie settings for better security
- ✅ Fixed Google OAuth token generation bug
- ✅ Added proper sign out functionality

### UI Issues
- ✅ Removed duplicate author display in Home page
- ✅ Added functional like buttons with real-time updates
- ✅ Added like count display
- ✅ Improved share functionality

### Backend Issues
- ✅ Fixed CORS configuration
- ✅ Improved error handling
- ✅ Added proper cookie management

## Troubleshooting

### 401 Unauthorized Errors
- Make sure your JWT_SECRET is set correctly
- Check that cookies are being sent with requests
- Verify MongoDB connection

### Like Functionality Not Working
- Ensure user is authenticated
- Check that the like API endpoints are accessible
- Verify the verifyToken middleware is working

### Image Upload Issues
- Check Cloudinary configuration
- Verify environment variables are set correctly
- Ensure proper file permissions

## API Endpoints

### Authentication
- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-in` - User login
- `POST /api/auth/google` - Google OAuth
- `GET /api/auth/sign-out` - User logout
- `GET /api/auth/check-auth` - Check authentication status

### Vlogs
- `GET /api/vlog/all` - Get all vlogs
- `GET /api/vlog/get/:id` - Get specific vlog
- `POST /api/vlog/create` - Create new vlog
- `PUT /api/vlog/update/:id` - Update vlog
- `DELETE /api/vlog/delete/:id` - Delete vlog

### Likes
- `POST /api/like/:vlogId` - Like a vlog
- `DELETE /api/like/:vlogId` - Unlike a vlog
- `GET /api/like/status/:vlogId` - Get like status
- `GET /api/like/:vlogId` - Get all likes for a vlog

### Users
- `GET /api/user/:id` - Get user profile
- `PUT /api/user/update/:id` - Update user profile
- `DELETE /api/user/delete/:id` - Delete user account
