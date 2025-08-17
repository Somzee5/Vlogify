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
    apiUrl: 'https://vlogify-backend-t0le.onrender.com',
    frontendUrl: 'https://vlogify-frontend-yckt.onrender.com',
    appName: 'Vlogify'
  }
};

// Get current environment - automatically detect
const environment = import.meta.env.MODE || 'development';

// Override with environment variable if provided (for Render deployment)
const apiUrlFromEnv = import.meta.env.VITE_API_URL;
if (apiUrlFromEnv) {
  config.production.apiUrl = apiUrlFromEnv;
}

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
