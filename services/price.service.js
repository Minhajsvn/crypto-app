const axios = require('axios');
const Price = require('../models/price.model');
const Transaction = require('../models/transaction.model')

const fetchEthereumPrice = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
            ids: 'ethereum',
            vs_currencies: 'inr',
        },
        });

        const ethPrice = response.data.ethereum.inr;

        const newPrice = new Price({
        price: ethPrice,
        currency: 'INR',
        });

        await newPrice.save();

        console.log(`Ethereum price of INR ${ethPrice} stored at ${new Date().toLocaleString()}`);
        return ethPrice;
    } catch (error) {
        console.error('Error fetching Ethereum price:', error);
        throw new Error('Failed to fetch Ethereum price');
    }
};

const getCurrentEthereumPrice = async () => {
    try {
        const latestPrice = await Price.findOne().sort({ fetchedAt: -1 });
        return latestPrice ? latestPrice.price : null;
    } catch (error) {
        console.error('Error retrieving Ethereum price:', error);
        throw new Error('Failed to retrieve Ethereum price');
    }
};

const calculateTotalExpenses = async (address) => {
    try {
        const transactions = await Transaction.find({ from: address });
    
        const totalExpenses = transactions.reduce((acc, tx) => {
            const gasUsed = parseFloat(tx.gasUsed);
            const gasPrice = parseFloat(tx.gasPrice);
            const expense = (gasUsed * gasPrice) / 1e18;
            return acc + expense;
        }, 0);
    
        return totalExpenses;
        } catch (error) {
        console.error('Error calculating expenses:', error);
        throw new Error('Failed to calculate expenses');
        }
    };

module.exports = {
    fetchEthereumPrice,
    getCurrentEthereumPrice,
    calculateTotalExpenses,
};
