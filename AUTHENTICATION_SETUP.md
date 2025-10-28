# Authentication Setup Guide

This guide will help you set up the production-grade authentication system with both traditional login and Google OAuth2.

## Features

✅ **Traditional Username/Password Authentication**
- Secure login form with validation
- Password visibility toggle
- Remember me functionality
- Error handling and loading states

✅ **Google OAuth2 Integration**
- One-click Google Sign-In
- Secure token handling
- Automatic user profile retrieval

✅ **Production-Ready Security**
- JWT token management
- HTTP interceptor for API requests
- Route guards for protected pages
- Automatic token refresh handling

✅ **User Experience**
- Responsive design
- Accessibility compliant
- Loading states and error messages
- User dropdown menu with profile options

## Setup Instructions

### 1. Google OAuth2 Configuration

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one

2. **Enable Google Sign-In API**
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sign-In API" and enable it

3. **Create OAuth2 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Add your domain to "Authorized JavaScript origins":
     - For development: `http://localhost:4200`
     - For production: `https://yourdomain.com`

4. **Update Configuration**
   - Copy your Client ID
   - Open `src/app/config/auth.config.ts`
   - Replace `YOUR_GOOGLE_CLIENT_ID_HERE` with your actual Client ID

### 2. Backend API Requirements

Your backend API should support these endpoints:

#### Traditional Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "avatar": "https://example.com/avatar.jpg" // optional
  }
}
```

#### Google OAuth Login
```
POST /auth/google
Content-Type: application/json

{
  "token": "google_jwt_token"
}

Response:
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "User Name",
    "avatar": "https://example.com/avatar.jpg"
  }
}
```

### 3. Environment Configuration

Update `src/app/config/auth.config.ts` with your settings:

```typescript
export const AuthConfig = {
  googleClientId: 'your-actual-client-id.apps.googleusercontent.com',
  apiBaseUrl: 'https://your-api-domain.com',
  // ... other settings
};
```

### 4. Running the Application

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Access the Application**
   - Navigate to `http://localhost:4200`
   - You'll be redirected to `/login` if not authenticated
   - Try both login methods

## Usage

### Protected Routes
All routes are protected by default using the `AuthGuard`. Users must be authenticated to access them.

### Login Flow
1. User visits any protected route
2. Gets redirected to `/login` if not authenticated
3. Can choose between:
   - Traditional email/password login
   - Google OAuth2 sign-in
4. Upon successful authentication, redirected to the original route

### User Management
- User info is stored in localStorage
- JWT token is automatically attached to API requests
- User can logout from the navbar dropdown
- Session persists across browser refreshes

## Customization

### Styling
- Login page: `src/app/login/login.component.css`
- Navbar: `src/app/navbar/navbar.component.css`
- Both components use modern CSS with responsive design

### API Integration
- Auth service: `src/app/services/auth.service.ts`
- HTTP interceptor: `src/app/interceptors/auth.interceptor.ts`
- Update API endpoints in the auth config

### Google Sign-In Customization
- Button styling: Modify `src/app/services/google-signin.service.ts`
- Available options: theme, size, text, shape
- See [Google Sign-In documentation](https://developers.google.com/identity/gsi/web/reference/js-reference)

## Security Considerations

1. **HTTPS Required**: Google OAuth2 requires HTTPS in production
2. **Token Storage**: Tokens are stored in localStorage (consider httpOnly cookies for enhanced security)
3. **CORS Configuration**: Ensure your backend allows requests from your frontend domain
4. **Token Expiration**: Implement token refresh logic in your backend
5. **Input Validation**: All form inputs are validated on the frontend and should be validated on the backend

## Troubleshooting

### Common Issues

1. **Google Sign-In Not Loading**
   - Check if the Client ID is correct
   - Verify domain is added to authorized origins
   - Check browser console for errors

2. **API Requests Failing**
   - Verify API base URL in config
   - Check CORS settings on backend
   - Ensure backend endpoints match the expected format

3. **Authentication Not Persisting**
   - Check localStorage in browser dev tools
   - Verify token format and expiration
   - Check if AuthGuard is properly configured

### Debug Mode
Enable debug logging by adding to your component:
```typescript
constructor() {
  console.log('Auth Config:', AuthConfig);
}
```

## Next Steps

1. **Add Registration**: Create a signup component
2. **Password Reset**: Implement forgot password functionality
3. **Profile Management**: Add user profile editing
4. **Social Logins**: Add Facebook, Twitter, etc.
5. **Two-Factor Auth**: Implement 2FA for enhanced security

## Support

For issues or questions:
1. Check the browser console for errors
2. Verify all configuration steps
3. Test API endpoints independently
4. Check Google Cloud Console for OAuth2 setup issues