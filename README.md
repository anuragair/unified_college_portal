# Unified College Portal

A comprehensive college portal system with frontend and backend integration for managing students, faculty, parents, and admin users.

## Features

- ✅ User Registration & Authentication
- ✅ Role-based Access Control (Student, Faculty, Parent, Admin)
- ✅ JWT Token Authentication
- ✅ Contact Form Submission
- ✅ Protected Dashboard Pages
- ✅ Responsive Landing Page

## Project Structure

```
unified_college_portal/
├── Backend/          # Node.js/Express API server
├── Frontend/         # HTML/CSS/JavaScript frontend
└── Documentation/    # Setup and integration guides
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Install Node.js** (if not installed):
   - macOS: `brew install node`
   - Or download from [nodejs.org](https://nodejs.org/)

2. **Install Backend Dependencies**:
   ```bash
   cd Backend
   npm install
   ```

3. **Start the Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   ```
   http://localhost:3000
   ```

## Documentation

- **[SETUP.md](SETUP.md)** - Detailed setup instructions
- **[INSTALLATION.md](INSTALLATION.md)** - Installation guide
- **[INTEGRATION.md](INTEGRATION.md)** - Frontend-backend integration details
- **[Backend/README.md](Backend/README.md)** - Backend API documentation

## Technology Stack

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs (Password Hashing)
- File-based Storage (JSON)

### Frontend
- Vanilla JavaScript (ES6 Modules)
- HTML5
- CSS3

## API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/contact/submit` - Submit contact form
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## Status

✅ Backend API Server - Complete
✅ Frontend Integration - Complete
✅ Authentication System - Complete
✅ Form Handlers - Complete
✅ Protected Routes - Complete

Ready for development and testing!
