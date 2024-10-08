const Transaction = require('../models/transaction.model')
const axios = require('axios');


const getTransaction = async (address) => {
    try {
        const response = await axios.get(`https://api.etherscan.io/api`, {
            params: {
                module: 'account',
                action: 'txlist',
                address: address,
                startblock: 0,
                endblock: 99999999,
                sort: 'asc',
                apikey: process.env.ETHERSCAN_API_KEY,
            },
        });
    
        const transactions = response.data.result;
    
        // Store transactions in MongoDB
        if (transactions.length) {
            await Transaction.insertMany(transactions);
        }
        return transactions;
    } catch (error) {
        console.error('Error fetching transactions:', error)
    }
};



module.exports = {
    getTransaction,
} 