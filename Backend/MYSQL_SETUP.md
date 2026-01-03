# MySQL Database Setup Guide

This guide will help you set up MySQL database for the Unified College Portal.

## Prerequisites

1. **MySQL Server** installed on your system
   - macOS: `brew install mysql` or download from [mysql.com](https://dev.mysql.com/downloads/mysql/)
   - Verify installation: `mysql --version`

2. **Node.js** and **npm** installed

## Step 1: Install MySQL Package

```bash
cd Backend
npm install
```

This will install `mysql2` package along with other dependencies.

## Step 2: Configure Database Connection

Create or update the `.env` file in the `Backend` directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=college_portal
```

**Important:** Replace `your_mysql_password` with your actual MySQL root password.

## Step 3: Start MySQL Server

Make sure MySQL server is running:

**macOS:**
```bash
brew services start mysql
# or
mysql.server start
```

**Linux:**
```bash
sudo systemctl start mysql
# or
sudo service mysql start
```

**Windows:**
- Start MySQL from Services or use MySQL Workbench

## Step 4: Create Database and Tables

### Option A: Automatic Migration (Recommended)

Run the migration script:

```bash
cd Backend
npm run migrate
```

This will:
- Create the database if it doesn't exist
- Create all necessary tables
- Set up indexes

**Expected Output:**
```
Connected to MySQL server
✅ Database 'college_portal' created or already exists
✅ Database schema migrated successfully
✅ Tables created: users, contacts
✅ Migration completed successfully!
```

### Option B: Manual Setup

1. **Login to MySQL:**
   ```bash
   mysql -u root -p
   ```

2. **Run the schema file:**
   ```bash
   mysql -u root -p < database/schema.sql
   ```

   Or copy and paste the contents of `database/schema.sql` into MySQL client.

## Step 5: Verify Database Setup

Test the connection:

```bash
mysql -u root -p -e "USE college_portal; SHOW TABLES;"
```

You should see:
```
+----------------------+
| Tables_in_college_portal |
+----------------------+
| contacts             |
| users                |
+----------------------+
```

## Step 6: Start the Backend Server

```bash
cd Backend
npm run dev
```

**Expected Output:**
```
✅ Database connected successfully
Server is running on http://localhost:3000
Environment: development
Database: college_portal (Connected)
```

If you see "Database connected successfully", everything is working!

## Troubleshooting

### Issue: "Access denied for user"

**Solution:**
- Check your MySQL username and password in `.env`
- Verify MySQL user has proper permissions:
  ```sql
  GRANT ALL PRIVILEGES ON college_portal.* TO 'root'@'localhost';
  FLUSH PRIVILEGES;
  ```

### Issue: "Can't connect to MySQL server"

**Solution:**
- Make sure MySQL server is running
- Check if MySQL is listening on the correct port (default: 3306)
- Verify `DB_HOST` in `.env` is correct

### Issue: "Unknown database 'college_portal'"

**Solution:**
- Run the migration: `npm run migrate`
- Or manually create the database:
  ```sql
  CREATE DATABASE college_portal;
  ```

### Issue: "Table already exists"

**Solution:**
- This is normal if tables were already created
- The migration script handles this gracefully
- If you need to reset, drop and recreate:
  ```sql
  DROP DATABASE college_portal;
  CREATE DATABASE college_portal;
  ```
  Then run `npm run migrate` again

### Issue: Migration script fails

**Solution:**
1. Check MySQL is running
2. Verify credentials in `.env`
3. Try manual setup (Option B above)
4. Check MySQL error logs

## Database Schema

### Users Table
- `id` - Primary key (auto-increment)
- `userType` - ENUM: Student, Faculty, Parent, Admin
- `fullName` - User's full name
- `cid` - College ID (unique)
- `email` - Email address (unique)
- `phone` - Phone number
- `password` - Hashed password
- `isActive` - Account status
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Contacts Table
- `id` - Primary key (auto-increment)
- `name` - Contact name
- `email` - Contact email
- `subject` - Message subject
- `message` - Message content
- `status` - ENUM: new, read, replied
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Migrating from JSON to MySQL

If you have existing data in JSON files:

1. **Backup existing data:**
   ```bash
   cp Backend/data/users.json Backend/data/users.json.backup
   cp Backend/data/contacts.json Backend/data/contacts.json.backup
   ```

2. **Import script** (optional - create if needed):
   - You can create a migration script to import JSON data
   - Or manually register users again through the registration form

3. **Test the application:**
   - Register a new user
   - Login
   - Submit contact form
   - Verify data in MySQL:
     ```sql
     SELECT * FROM users;
     SELECT * FROM contacts;
     ```

## Production Considerations

For production deployment:

1. **Use a dedicated database user** (not root):
   ```sql
   CREATE USER 'portal_user'@'localhost' IDENTIFIED BY 'strong_password';
   GRANT ALL PRIVILEGES ON college_portal.* TO 'portal_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

2. **Update `.env` with production credentials**

3. **Enable SSL connections** if needed

4. **Set up database backups**

5. **Use connection pooling** (already configured)

6. **Monitor database performance**

## Next Steps

After MySQL is set up:
1. ✅ Database is connected
2. ✅ Tables are created
3. ✅ Server starts successfully
4. Test registration and login
5. Verify data is stored in MySQL

Your application is now using MySQL! 🎉

