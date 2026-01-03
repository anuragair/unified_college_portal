# Unified College Portal - Setup Guide

## Quick Start

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Backend directory:
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

4. Start the backend server:
```bash
npm run dev
```

The backend server will run on `http://localhost:3000`

### Frontend Setup

The frontend is static HTML/CSS/JavaScript. You can:

1. **Option 1: Use the backend server** (Recommended)
   - The backend server is configured to serve static files from the Frontend directory
   - Just start the backend server and access `http://localhost:3000`

2. **Option 2: Use a local web server**
   - Use any static file server (e.g., Python's `http.server`, Node's `http-server`, or VS Code's Live Server)
   - Make sure to update the API URL in `Frontend/src/utils/api.js` if needed

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Contact
- `POST /api/contact/submit` - Submit contact form

### Users
- `GET /api/users/profile` - Get user profile (requires auth)
- `PUT /api/users/profile` - Update user profile (requires auth)

## Testing the Application

1. Start the backend server
2. Open `http://localhost:3000` in your browser
3. Try registering a new user
4. Login with your credentials
5. Test the contact form

## Data Storage

User data and contact submissions are stored in JSON files:
- `Backend/data/users.json`
- `Backend/data/contacts.json`

These files are automatically created when you first run the server.

## Troubleshooting

### CORS Errors
If you encounter CORS errors, make sure:
- The backend server is running
- The API URL in `Frontend/src/utils/api.js` matches your backend URL
- The backend CORS middleware is properly configured

### Port Already in Use
If port 3000 is already in use:
- Change the PORT in your `.env` file
- Update the API_BASE_URL in `Frontend/src/utils/api.js` accordingly

### Module Import Errors
Make sure you're accessing the application through a web server (not file:// protocol) to support ES6 modules.

