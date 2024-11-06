// server/index.js
const express = require('express');
const tickerRoutes = require('./routes/tickerRoutes');
const Ticker = require('./models/Ticker');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', tickerRoutes);

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, '../client')));

// Ensure the tickers table is created
Ticker.createTableIfNotExists().then(() => {
  // Start the server after ensuring the table is created
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
