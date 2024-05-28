const sql = require("mssql");

//database config
const getMSSQLDatabaseConfig = {
    server: 'NICHAREE-CHUACHART', 
    user: 'sa',
    password: 'data1234',
    database: 'ProductClothesDB', 
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
      },
      options: {
          encrypt: false, 
          trustServerCertificate: true
      }
};

// Middleware to establish MSSQL connection pool
const connectToMSSQLDatabase = async () => {
    try {
        const pool = await sql.connect(getMSSQLDatabaseConfig);
        console.log('Connected to MSSQL database');
        return pool;
    } catch (error) {
        console.error('Error connecting to MSSQL:', error);
        throw error;
    }
  }
  
  module.exports = connectToMSSQLDatabase;
  

  