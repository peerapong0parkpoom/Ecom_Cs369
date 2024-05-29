const sql = require("mssql");

// Database configuration
const dbConfig = {
  server: 'DESKTOP-QL0GKHM',
  user: 'sa',
  password: 'P@ssw0rd',
  database: 'PRODUCT',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
      encrypt: true, // For Azure
      trustServerCertificate: true
  }
};

// Middleware to establish MSSQL connection pool
const connectToDatabase = async () => {
  try {
      const pool = await sql.connect(dbConfig);
      console.log('Connected to MSSQL database');
      return pool;
  } catch (error) {
      console.error('Error connecting to MSSQL:', error);
      throw error;
  }
}

module.exports = connectToDatabase;