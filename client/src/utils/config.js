// Frontend configuration and environment variables
export const config = {
  // Frontend URL - defaults to localhost:5173 for development
  FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',
  
  // API URL - defaults to localhost:3000 for development
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  
  // App configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Vlogify',
  APP_DESCRIPTION: import.meta.env.VITE_APP_DESCRIPTION || 'Your Travel Stories, Our Platform',
  
  // Social media sharing
  DEFAULT_SHARE_TEXT: import.meta.env.VITE_DEFAULT_SHARE_TEXT || 'Check out this amazing travel adventure on Vlogify!',
  TWITTER_HANDLE: import.meta.env.VITE_TWITTER_HANDLE || '@vlogify',
  
  // Get current origin (useful for sharing)
  getCurrentOrigin: () => window.location.origin,
  
  // Get full URL for a vlog
  getVlogUrl: (vlogId) => `${window.location.origin}/vlog/${vlogId}`,
  
  // Get full URL for a user profile
  getUserProfileUrl: (userId) => `${window.location.origin}/profile/${userId}`,
};
