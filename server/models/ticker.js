// models/Ticker.js
const pool = require('../config/db');

class Ticker {
  // Method to create the tickers table if it doesn't exist
  static async createTableIfNotExists() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS tickers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        last NUMERIC(20, 8),
        buy NUMERIC(20, 8),
        sell NUMERIC(20, 8),
        volume NUMERIC(20, 8),
        base_unit VARCHAR(20)
      );
    `;

    try {
      await pool.query(createTableQuery);
      console.log("Table 'tickers' is ready.");
    } catch (error) {
      console.error('Error creating table:', error.message);
    }
  }

  // Method to insert a ticker into the database
  static async insertTicker(ticker) {
    const query = `
      INSERT INTO tickers (name, last, buy, sell, volume, base_unit)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    const values = [
      ticker.name,
      ticker.last,
      ticker.buy,
      ticker.sell,
      ticker.volume,
      ticker.base_unit,
    ];
    await pool.query(query, values);
  }

  // Method to truncate the tickers table
  static async truncateTable() {
    await pool.query('TRUNCATE TABLE tickers RESTART IDENTITY');
  }

  // Method to retrieve all tickers from the database
  static async getAllTickers() {
    const result = await pool.query('SELECT * FROM tickers');
    return result.rows;
  }
}

module.exports = Ticker;
