export const AuthConfig = {
  // Replace with your actual Google OAuth2 Client ID
  googleClientId: '47373018903-h2kdr05nmk386o71iq63hemb2lsd09i8.apps.googleusercontent.com',
  
  // API endpoints
  apiBaseUrl: 'https://api.cprogrammer1209.shop',
  
  // Token storage keys
  tokenKey: 'auth_token',
  userKey: 'user_data',
  
  // Login redirect paths
  loginRedirectPath: '/login',
  defaultRedirectPath: '/'
};

// Instructions for setting up Google OAuth2:
// 1. Go to Google Cloud Console (https://console.cloud.google.com/)
// 2. Create a new project or select existing one
// 3. Enable Google+ API
// 4. Go to Credentials section
// 5. Create OAuth 2.0 Client ID
// 6. Add your domain to authorized origins
// 7. Replace YOUR_GOOGLE_CLIENT_ID_HERE with your actual client ID