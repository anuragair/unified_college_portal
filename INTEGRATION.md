# Frontend-Backend Integration Guide

## Integration Status ✅

The frontend and backend are fully integrated and ready to use!

## What's Been Integrated

### 1. **Backend API Server**
- ✅ Express server with CORS enabled
- ✅ Authentication endpoints (register, login, verify)
- ✅ Contact form endpoint
- ✅ User profile endpoints
- ✅ JWT token authentication
- ✅ File-based data storage

### 2. **Frontend API Integration**
- ✅ `Frontend/src/utils/api.js` - API helper functions
- ✅ All API calls configured to connect to `http://localhost:3000/api`
- ✅ Token storage in localStorage
- ✅ Automatic token inclusion in API requests

### 3. **Form Integration**

#### Registration Form (`index.html`)
- ✅ Connected to `/api/auth/register`
- ✅ Validates input before submission
- ✅ Stores token and user data on success
- ✅ Redirects to login section

#### Login Form (`index.html` and `login.html`)
- ✅ Connected to `/api/auth/login`
- ✅ Supports email or college ID login
- ✅ Redirects based on user type:
  - Student → `student.html`
  - Faculty → `faculty.html`
  - Admin → `admin.html`
  - Parent → `dashboard.html`

#### Contact Form (`index.html`)
- ✅ Connected to `/api/contact/submit`
- ✅ Validates all fields
- ✅ Shows success/error messages

### 4. **Authentication System**

#### Login Page (`login.html`)
- ✅ Full authentication flow
- ✅ Auto-redirect if already logged in
- ✅ Error handling

#### Protected Pages
- ✅ `student.html` - Requires authentication
- ✅ `faculty.html` - Requires authentication
- ✅ `admin.html` - Requires authentication
- ✅ `dashboard.html` - Requires authentication

All protected pages:
- Check authentication on load
- Display user information
- Provide logout functionality
- Redirect to login if not authenticated

### 5. **Authentication Helpers**
- ✅ `auth.js` - Shared authentication utilities
- ✅ `login.js` - Login page specific functionality
- ✅ Token verification
- ✅ Auto-logout on invalid token

## API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/verify
```

### Contact
```
POST /api/contact/submit
```

### Users
```
GET /api/users/profile
PUT /api/users/profile
GET /api/users/all (Admin only)
```

## Data Flow

### Registration Flow
1. User fills registration form
2. Frontend validates input
3. POST request to `/api/auth/register`
4. Backend validates, hashes password, creates user
5. Returns JWT token and user data
6. Frontend stores token and user in localStorage
7. User redirected to login

### Login Flow
1. User enters credentials
2. POST request to `/api/auth/login`
3. Backend verifies credentials
4. Returns JWT token and user data
5. Frontend stores token and user
6. Redirects to appropriate dashboard based on user type

### Protected Page Flow
1. Page loads
2. Checks for token in localStorage
3. If no token → redirect to login
4. If token exists → verify with backend
5. If valid → display page
6. If invalid → clear storage and redirect to login

## Configuration

### Backend Configuration
- **Port:** 3000 (configurable in `.env`)
- **JWT Secret:** Set in `.env` file
- **CORS:** Enabled for all origins (development)

### Frontend Configuration
- **API Base URL:** `http://localhost:3000/api`
- Located in: `Frontend/src/utils/api.js`
- Change `API_BASE_URL` if backend runs on different port

## Testing the Integration

### 1. Start Backend
```bash
cd Backend
npm install  # If not already done
npm run dev
```

### 2. Test Registration
1. Open `http://localhost:3000`
2. Navigate to Register section
3. Fill form and submit
4. Should see success message

### 3. Test Login
1. Use registered credentials
2. Login via Sign In section or login page
3. Should redirect to appropriate dashboard
4. User name should display

### 4. Test Protected Pages
1. Try accessing `/src/pages/student.html` directly
2. Should redirect to login if not authenticated
3. After login, should access successfully

### 5. Test Contact Form
1. Fill contact form
2. Submit
3. Should see success message
4. Data saved in `Backend/data/contacts.json`

## File Structure

```
unified_college_portal/
├── Backend/
│   ├── server.js              # Main server file
│   ├── routes/                # API routes
│   │   ├── auth.js           # Authentication routes
│   │   ├── contact.js        # Contact form routes
│   │   └── users.js          # User profile routes
│   ├── models/               # Data models
│   │   ├── User.js           # User model
│   │   └── Contact.js        # Contact model
│   ├── middleware/           # Middleware
│   │   └── auth.js           # Authentication middleware
│   ├── data/                 # Data storage (auto-created)
│   │   ├── users.json
│   │   └── contacts.json
│   └── .env                  # Environment variables
│
└── Frontend/
    ├── index.html            # Landing page with forms
    └── src/
        ├── utils/
        │   └── api.js        # API helper functions
        ├── assets/js/
        │   ├── auth.js       # Authentication helpers
        │   └── login.js      # Login page logic
        └── pages/
            ├── login.html    # Login page
            ├── student.html  # Student dashboard
            ├── faculty.html  # Faculty dashboard
            ├── admin.html    # Admin dashboard
            └── dashboard.html # General dashboard
```

## Troubleshooting

### CORS Errors
- ✅ CORS is enabled in backend
- Check API URL in `Frontend/src/utils/api.js`
- Ensure backend is running

### Module Import Errors
- ✅ All scripts use `type="module"`
- Access via `http://localhost:3000` (not `file://`)
- Backend serves files with proper MIME types

### Authentication Not Working
- Check browser console for errors
- Verify token in localStorage
- Check backend logs for API errors
- Ensure JWT_SECRET is set in `.env`

### Data Not Persisting
- Check `Backend/data/` directory exists
- Verify file permissions
- Check backend logs for errors

## Next Steps

1. **Install Node.js** (if not installed)
2. **Install backend dependencies:**
   ```bash
   cd Backend
   npm install
   ```
3. **Start the server:**
   ```bash
   npm run dev
   ```
4. **Open in browser:**
   ```
   http://localhost:3000
   ```

Everything is ready to go! 🚀

