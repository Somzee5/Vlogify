// Configuration for different environments
const config = {
  // Development
  development: {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    frontendUrl: import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173',
    appName: import.meta.env.VITE_APP_NAME || 'Vlogify'
  },
  // Production - UPDATE THESE URLs AFTER DEPLOYMENT
  production: {
    apiUrl: import.meta.env.VITE_API_URL || 'https://YOUR_BACKEND_URL.onrender.com',
    frontendUrl: import.meta.env.VITE_FRONTEND_URL || 'https://YOUR_FRONTEND_URL.onrender.com',
    appName: import.meta.env.VITE_APP_NAME || 'Vlogify'
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
