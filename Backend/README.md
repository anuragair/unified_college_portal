# Unified College Portal - Backend API

Backend server for the Unified College Portal application built with Node.js and Express.

## Features

- User Registration and Authentication
- JWT-based token authentication
- Contact form submission
- User profile management
- Role-based access control (Student, Parent, Faculty, Admin)
- File-based data storage (can be easily migrated to database)

## Setup Instructions

### 1. Install Dependencies

```bash
cd Backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the Backend directory:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

**Important:** Change `JWT_SECRET` to a secure random string in production.

### 3. Run the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ userType, fullName, cid, email, phone, password, confirmPassword }`
  
- `POST /api/auth/login` - Login user
  - Body: `{ loginEmail, loginPassword }`
  
- `GET /api/auth/verify` - Verify JWT token
  - Headers: `Authorization: Bearer <token>`

### Contact

- `POST /api/contact/submit` - Submit contact form
  - Body: `{ contactName, contactEmail, contactSubject, contactMessage }`

### Users

- `GET /api/users/profile` - Get current user profile (requires authentication)
- `PUT /api/users/profile` - Update user profile (requires authentication)
- `GET /api/users/all` - Get all users (Admin only)

## Data Storage

Currently, the application uses JSON files for data storage:
- `Backend/data/users.json` - User data
- `Backend/data/contacts.json` - Contact form submissions

These files are automatically created when the server starts.

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- Input validation using express-validator
- CORS enabled for frontend communication
- Role-based access control

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Email notifications
- Password reset functionality
- File upload support
- Advanced analytics and reporting

