-- Unified College Portal Database Schema
-- Run this script to create the database and tables

-- Create database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS college_portal;
USE college_portal;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userType ENUM('Student', 'Faculty', 'Parent', 'Admin') NOT NULL,
  fullName VARCHAR(255) NOT NULL,
  cid VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  isActive BOOLEAN DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_cid (cid),
  INDEX idx_userType (userType)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'replied') DEFAULT 'new',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_createdAt (createdAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: Create indexes for better performance
-- Already included in table definitions above

-- Optional: Insert a default admin user (password: admin123)
-- Password hash for 'admin123': $2a$10$rOzJqJqJqJqJqJqJqJqJqO
-- You can generate a new hash using bcrypt or use the registration endpoint
-- INSERT INTO users (userType, fullName, cid, email, phone, password) 
-- VALUES ('Admin', 'System Administrator', 'ADMIN001', 'admin@college.edu', '0000000000', '$2a$10$rOzJqJqJqJqJqJqJqJqJqO');

