const mysql = require('mysql2/promise');
require('dotenv').config();

// Database configuration
const getDbConfig = () => ({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'college_portal',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Create connection pool (lazy initialization)
let pool = null;

const getPool = () => {
  if (!pool) {
    const dbConfig = getDbConfig();
    // Log config (without password) for debugging
    console.log('Database config:', {
      host: dbConfig.host,
      user: dbConfig.user,
      database: dbConfig.database,
      passwordSet: !!dbConfig.password
    });
    pool = mysql.createPool(dbConfig);
  }
  return pool;
};

// Test database connection
async function testConnection() {
  try {
    const connection = await getPool().getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    if (error.message.includes('Access denied')) {
      console.error('   Check your DB_PASSWORD in .env file');
    }
    return false;
  }
}

// Execute query helper
async function query(sql, params) {
  try {
    const [results] = await getPool().execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Get a connection from the pool
async function getConnection() {
  return await getPool().getConnection();
}

module.exports = {
  get pool() { return getPool(); },
  query,
  getConnection,
  testConnection
};

