# Database Directory

This directory contains database schema and migration files.

## Files

- `schema.sql` - SQL schema for creating database and tables
- `migrate.js` - Node.js script to automatically create database and tables

## Usage

### Automatic Migration
```bash
npm run migrate
```

### Manual Setup
1. Login to MySQL: `mysql -u root -p`
2. Run: `source database/schema.sql`

## Schema Overview

### Tables
- **users** - User accounts (Student, Faculty, Parent, Admin)
- **contacts** - Contact form submissions

### Indexes
- Email and CID indexes on users table for fast lookups
- Status and createdAt indexes on contacts table

## Notes

- The migration script is idempotent (safe to run multiple times)
- Tables use InnoDB engine with UTF8MB4 charset
- Timestamps are automatically managed

