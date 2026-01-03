# Installation Guide

## Prerequisites

Before installing the backend, you need to have Node.js and npm installed on your system.

### Installing Node.js

1. **macOS (using Homebrew):**
   ```bash
   brew install node
   ```

2. **macOS (using official installer):**
   - Visit [nodejs.org](https://nodejs.org/)
   - Download the LTS version for macOS
   - Run the installer

3. **Verify installation:**
   ```bash
   node --version
   npm --version
   ```

## Backend Installation

Once Node.js is installed, follow these steps:

### 1. Navigate to Backend Directory

```bash
cd Backend
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages:
- express
- cors
- dotenv
- bcryptjs
- jsonwebtoken
- express-validator
- body-parser

### 3. Environment Setup

The `.env` file has been created with default values. You can modify it if needed:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=unified-college-portal-secret-key-2024-change-in-production
```

**Important:** Change the `JWT_SECRET` to a secure random string in production.

### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000`

## Frontend Integration

The frontend is already integrated with the backend:

1. **API Configuration:** `Frontend/src/utils/api.js` is configured to connect to `http://localhost:3000/api`

2. **Form Handlers:** All forms in `index.html` are connected to the backend API

3. **Authentication:** Login page (`login.html`) is integrated with the authentication API

4. **Protected Pages:** All dashboard pages (student, faculty, admin) have authentication checks

## Testing the Integration

1. **Start the backend server:**
   ```bash
   cd Backend
   npm run dev
   ```

2. **Open the application:**
   - Navigate to `http://localhost:3000` in your browser
   - The backend server serves the frontend files automatically

3. **Test Registration:**
   - Go to the Register section
   - Fill in the form and submit
   - You should see a success message

4. **Test Login:**
   - Go to the Sign In section (or use the login page)
   - Enter your credentials
   - You should be redirected to the appropriate dashboard

5. **Test Contact Form:**
   - Fill out the contact form
   - Submit and verify the success message

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

1. Change the PORT in `Backend/.env`
2. Update `API_BASE_URL` in `Frontend/src/utils/api.js` to match

### CORS Errors

If you see CORS errors:
- Make sure the backend server is running
- Verify the API URL in `Frontend/src/utils/api.js`
- Check that CORS is enabled in `Backend/server.js`

### Module Import Errors

If you see ES6 module errors:
- Make sure you're accessing via `http://localhost:3000` (not `file://`)
- The backend server serves files with proper MIME types

### Data Storage

User data is stored in:
- `Backend/data/users.json` - Created automatically on first registration
- `Backend/data/contacts.json` - Created automatically on first contact submission

## Next Steps

After installation:
1. Test all functionality
2. Customize the JWT_SECRET for production
3. Consider migrating to a database (MongoDB/PostgreSQL) for production use
4. Add email functionality for contact form notifications
5. Implement password reset functionality

