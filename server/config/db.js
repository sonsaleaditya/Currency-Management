// config/db.js
require('dotenv').config();
const { Pool } = require('pg');
const pgtools = require('pgtools');

const config = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};

const pool = new Pool({
  ...config,
  database: process.env.PG_DATABASE,
});

// Function to create the database if it doesn't exist
const initializeDatabase = async () => {
  try {
    // Attempt to connect to the database
    await pool.connect();
    console.log('Database connected successfully');
  } catch (err) {
    // If database does not exist, create it
    if (err.code === '3D000') { // '3D000' is the error code for "database does not exist"
      console.log(`Database "${process.env.PG_DATABASE}" not found. Attempting to create it...`);
      try {
        await pgtools.createdb(config, process.env.PG_DATABASE);
        console.log(`Database "${process.env.PG_DATABASE}" created successfully`);

        // Re-initialize the pool with the new database
        pool.options.database = process.env.PG_DATABASE;
      } catch (createErr) {
        console.error('Error creating database:', createErr.message);
      }
    } else {
      console.error('Database connection error:', err.stack);
    }
  }
};

initializeDatabase();

module.exports = pool;
