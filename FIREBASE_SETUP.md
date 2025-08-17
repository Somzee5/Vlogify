# Firebase OAuth Setup Guide

## Google OAuth Domain Configuration

To fix the "unauthorized-domain" error for Google OAuth, follow these steps:

### 1. Go to Firebase Console
- Visit [Firebase Console](https://console.firebase.google.com/)
- Select your project: `vlogify-9944`

### 2. Navigate to Authentication Settings
- Go to **Authentication** in the left sidebar
- Click on **Settings** tab
- Scroll down to **Authorized domains**

### 3. Add Your Domain
Add the following domains to the authorized domains list:
- `vlogify-frontend-yckt.onrender.com` (your deployed frontend)
- `localhost` (for local development)

### 4. Save Changes
- Click **Save** to apply the changes

### 5. Test OAuth
- Deploy your changes
- Test Google OAuth on your deployed site

## Alternative Solution (Temporary)

If you can't access Firebase Console immediately, users can still sign in using email/password while you configure the OAuth domains.

## Current Firebase Configuration

Your Firebase project details:
- **Project ID**: vlogify-9944
- **Auth Domain**: vlogify-9944.firebaseapp.com
- **Storage Bucket**: vlogify-9944.firebasestorage.app

## Environment Variables

Make sure these are set in your deployment environment:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`
