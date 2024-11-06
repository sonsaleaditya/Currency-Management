// controllers/tickerController.js
require('dotenv').config();
const axios = require('axios');
const Ticker = require('../models/Ticker');

const API_URL = process.env.API_URL;

exports.fetchAndStoreData = async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const data = response.data;

    const top10Data = Object.values(data).slice(0, 10).map((item) => ({
      name: item.name,
      last: parseFloat(item.last),
      buy: parseFloat(item.buy),
      sell: parseFloat(item.sell),
      volume: parseFloat(item.volume),
      base_unit: item.base_unit,
    }));

    await Ticker.truncateTable();

    for (const ticker of top10Data) {
      await Ticker.insertTicker(ticker);
    }

    res.status(200).json({ message: 'Data fetched and stored successfully.' });
  } catch (error) {
    console.error('Error in fetchAndStoreData:', error.message);
    res.status(500).json({ error: 'Failed to fetch and store data.' });
  }
};

exports.getTickers = async (req, res) => {
  try {
    const tickers = await Ticker.getAllTickers();
    res.status(200).json(tickers);
  } catch (error) {
    console.error('Error in getTickers:', error.message);
    res.status(500).json({ error: 'Failed to retrieve data.' });
  }
};
