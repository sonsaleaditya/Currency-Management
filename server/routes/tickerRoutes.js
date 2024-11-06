// routes/tickerRoutes.js
const express = require('express');
const { fetchAndStoreData, getTickers } = require('../controllers/tickerController');

const router = express.Router();

// Route to fetch and store data
router.get('/fetch-and-store', fetchAndStoreData);

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    msg: "Everything is good here",
  });
});

// Route to get stored data
router.get('/tickers', getTickers);

module.exports = router;
