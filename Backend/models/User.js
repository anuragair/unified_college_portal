const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_FILE = path.join(__dirname, '../data/users.json');

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
}

class User {
  static getAllUsers() {
    try {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading users file:', error);
      return [];
    }
  }

  static saveUsers(users) {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing users file:', error);
      return false;
    }
  }

  static async create(userData) {
    const users = this.getAllUsers();
    
    // Check if user already exists
    const existingUser = users.find(
      u => u.email === userData.email || u.cid === userData.cid
    );
    
    if (existingUser) {
      throw new Error('User with this email or college ID already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = {
      id: Date.now().toString(),
      userType: userData.userType,
      fullName: userData.fullName,
      cid: userData.cid,
      email: userData.email,
      phone: userData.phone,
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    users.push(newUser);
    this.saveUsers(users);

    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  static findByEmail(email) {
    const users = this.getAllUsers();
    return users.find(u => u.email === email);
  }

  static findByCid(cid) {
    const users = this.getAllUsers();
    return users.find(u => u.cid === cid);
  }

  static findById(id) {
    const users = this.getAllUsers();
    return users.find(u => u.id === id);
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static updateUser(id, updateData) {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === id);
    
    if (userIndex === -1) {
      return null;
    }

    users[userIndex] = { ...users[userIndex], ...updateData };
    this.saveUsers(users);

    const { password, ...userWithoutPassword } = users[userIndex];
    return userWithoutPassword;
  }
}

module.exports = User;

