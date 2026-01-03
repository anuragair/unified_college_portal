# Unified College Portal - Backend API

Backend server for the Unified College Portal application built with Node.js and Express.

## Features

- User Registration and Authentication
- JWT-based token authentication
- Contact form submission
- User profile management
- Role-based access control (Student, Parent, Faculty, Admin)
- MySQL database integration
- Connection pooling for optimal performance

## Setup Instructions

### 1. Install Dependencies

```bash
cd Backend
npm install
```

### 2. MySQL Database Setup

**Prerequisites:** MySQL server must be installed and running.

1. **Install MySQL** (if not installed):
   ```bash
   # macOS
   brew install mysql
   brew services start mysql
   ```

2. **Configure database connection** in `.env` file:
   ```env
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # MySQL Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=college_portal
   ```

3. **Create database and tables:**
   ```bash
   npm run migrate
   ```

   For detailed MySQL setup instructions, see [MYSQL_SETUP.md](MYSQL_SETUP.md)

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

## Database

The application uses MySQL database with the following tables:
- `users` - User accounts and authentication data
- `contacts` - Contact form submissions

**Database Schema:** See `database/schema.sql`

**Migration:** Run `npm run migrate` to create database and tables automatically.

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- Input validation using express-validator
- CORS enabled for frontend communication
- Role-based access control

## Database Management

### Migration Commands
- `npm run migrate` - Create database and tables

### Manual Database Access
```bash
mysql -u root -p college_portal
```

### View Tables
```sql
SHOW TABLES;
SELECT * FROM users;
SELECT * FROM contacts;
```

## Future Enhancements

- Email notifications
- Password reset functionality
- File upload support
- Advanced analytics and reporting
- Database migrations and versioning

