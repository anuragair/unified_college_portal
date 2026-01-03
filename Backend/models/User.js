const bcrypt = require('bcryptjs');
const { query } = require('../config/database');

class User {
  static async getAllUsers() {
    try {
      const users = await query('SELECT * FROM users ORDER BY createdAt DESC');
      return users;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw error;
    }
  }

  static async create(userData) {
    try {
      // Check if user already exists
      const existingUser = await this.findByEmailOrCid(userData.email, userData.cid);
      
      if (existingUser) {
        throw new Error('User with this email or college ID already exists');
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Insert new user
      const result = await query(
        `INSERT INTO users (userType, fullName, cid, email, phone, password, isActive) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          userData.userType,
          userData.fullName,
          userData.cid,
          userData.email,
          userData.phone,
          hashedPassword,
          true
        ]
      );

      // Fetch the created user
      const newUser = await this.findById(result.insertId);

      // Return user without password
      const { password, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const users = await query('SELECT * FROM users WHERE email = ?', [email]);
      return users[0] || null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  static async findByCid(cid) {
    try {
      const users = await query('SELECT * FROM users WHERE cid = ?', [cid]);
      return users[0] || null;
    } catch (error) {
      console.error('Error finding user by CID:', error);
      throw error;
    }
  }

  static async findByEmailOrCid(email, cid) {
    try {
      const users = await query(
        'SELECT * FROM users WHERE email = ? OR cid = ? LIMIT 1',
        [email, cid]
      );
      return users[0] || null;
    } catch (error) {
      console.error('Error finding user by email or CID:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const users = await query('SELECT * FROM users WHERE id = ?', [id]);
      return users[0] || null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async updateUser(id, updateData) {
    try {
      const allowedFields = ['fullName', 'phone', 'isActive'];
      const fields = [];
      const values = [];

      // Build update query dynamically
      for (const [key, value] of Object.entries(updateData)) {
        if (allowedFields.includes(key)) {
          fields.push(`${key} = ?`);
          values.push(value);
        }
      }

      if (fields.length === 0) {
        throw new Error('No valid fields to update');
      }

      values.push(id);

      await query(
        `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
        values
      );

      // Fetch updated user
      const updatedUser = await this.findById(id);
      
      if (!updatedUser) {
        return null;
      }

      // Return user without password
      const { password, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const result = await query('DELETE FROM users WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}

module.exports = User;
