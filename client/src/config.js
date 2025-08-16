// Configuration for different environments
const config = {
  // Development
  development: {
    apiUrl: 'http://localhost:3000',
    frontendUrl: 'http://localhost:5173',
    appName: 'Vlogify'
  },
  // Production - UPDATE THESE URLs AFTER DEPLOYMENT
  production: {
    apiUrl: 'https://YOUR_BACKEND_URL.onrender.com', // Replace with your actual backend URL
    frontendUrl: 'https://YOUR_FRONTEND_URL.onrender.com', // Replace with your actual frontend URL
    appName: 'Vlogify'
  }
};

// Get current environment
const environment = import.meta.env.MODE || 'development';

// Export current config
export const currentConfig = config[environment];

// Helper functions
export const getApiUrl = () => currentConfig.apiUrl;
export const getFrontendUrl = () => currentConfig.frontendUrl;
export const getAppName = () => currentConfig.appName;

// Generate URLs
export const generateVlogUrl = (vlogId) => `${getFrontendUrl()}/vlog/${vlogId}`;
export const generateProfileUrl = (userId) => `${getFrontendUrl()}/profile/${userId}`;

export default currentConfig;
