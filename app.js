const routes = require('./routes/v1/index')
const cron = require('node-cron');
const { priceService } = require('./services');

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

cron.schedule('*/10 * * * *', async () => {
    console.log('Fetching Ethereum price...');
    try {
        await priceService.fetchEthereumPrice();
    } catch (error) {
        console.error('Error in scheduled price fetch:', error.message);
    }
});

module.exports = app