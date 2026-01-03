# MySQL Integration - Quick Start Guide

## ✅ What's Been Done

MySQL integration is complete! The backend now uses MySQL instead of JSON files.

### Changes Made:
- ✅ Added `mysql2` package to dependencies
- ✅ Created database configuration (`config/database.js`)
- ✅ Created database schema (`database/schema.sql`)
- ✅ Created migration script (`database/migrate.js`)
- ✅ Updated User model to use MySQL
- ✅ Updated Contact model to use MySQL
- ✅ Updated server to test database connection on startup

## 🚀 Quick Setup (5 Steps)

### Step 1: Install MySQL

**macOS:**
```bash
brew install mysql
brew services start mysql
```

**Verify installation:**
```bash
mysql --version
```

### Step 2: Install Backend Dependencies

```bash
cd Backend
npm install
```

This will install `mysql2` package.

### Step 3: Configure Database

Create/update `Backend/.env` file:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# MySQL Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=college_portal
```

**Replace `your_mysql_password` with your MySQL root password.**

### Step 4: Create Database and Tables

```bash
cd Backend
npm run migrate
```

**Expected output:**
```
Connected to MySQL server
✅ Database 'college_portal' created or already exists
✅ Database schema migrated successfully
✅ Tables created: users, contacts
✅ Migration completed successfully!
```

### Step 5: Start the Server

```bash
npm run dev
```

**Expected output:**
```
✅ Database connected successfully
Server is running on http://localhost:3000
Environment: development
Database: college_portal (Connected)
```

## ✅ Verification

### Test Database Connection

```bash
mysql -u root -p -e "USE college_portal; SHOW TABLES;"
```

Should show:
```
+----------------------+
| Tables_in_college_portal |
+----------------------+
| contacts             |
| users                |
+----------------------+
```

### Test the Application

1. **Open browser:** `http://localhost:3000`
2. **Register a new user**
3. **Check database:**
   ```sql
   mysql -u root -p college_portal
   SELECT * FROM users;
   ```

You should see your registered user!

## 📁 File Structure

```
Backend/
├── config/
│   └── database.js          # Database connection configuration
├── database/
│   ├── schema.sql           # SQL schema file
│   ├── migrate.js           # Migration script
│   └── README.md            # Database documentation
├── models/
│   ├── User.js              # Updated to use MySQL
│   └── Contact.js           # Updated to use MySQL
└── .env                     # Database credentials (create this)
```

## 🔧 Troubleshooting

### "Access denied for user"
- Check MySQL password in `.env`
- Verify MySQL is running: `brew services list` (macOS)

### "Can't connect to MySQL server"
- Start MySQL: `brew services start mysql`
- Check if MySQL is running: `mysql -u root -p`

### "Unknown database"
- Run migration: `npm run migrate`

### Migration fails
- Check MySQL is running
- Verify credentials in `.env`
- Try manual setup (see MYSQL_SETUP.md)

## 📚 Documentation

- **[Backend/MYSQL_SETUP.md](Backend/MYSQL_SETUP.md)** - Detailed setup guide
- **[Backend/README.md](Backend/README.md)** - Backend documentation
- **[Backend/database/README.md](Backend/database/README.md)** - Database documentation

## 🎯 What Changed from JSON to MySQL

### Before (JSON):
- Data stored in `Backend/data/users.json`
- Data stored in `Backend/data/contacts.json`
- File-based operations

### After (MySQL):
- Data stored in MySQL database
- Tables: `users` and `contacts`
- Connection pooling for performance
- Better data integrity and relationships

## ✨ Benefits

1. **Better Performance** - Database queries are faster
2. **Data Integrity** - Foreign keys and constraints
3. **Scalability** - Handles large datasets
4. **Concurrent Access** - Multiple users safely
5. **Backup & Recovery** - Standard database tools
6. **Querying** - SQL for complex queries

## 🚀 Next Steps

1. ✅ MySQL is integrated
2. ✅ Database schema created
3. ✅ Models updated
4. Test registration and login
5. Verify data in MySQL
6. (Optional) Set up database backups

Your application is now using MySQL! 🎉

