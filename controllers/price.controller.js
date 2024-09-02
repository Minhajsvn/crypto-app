const { priceService } = require('../services');

const getCurrentPrice = async (req, res) => {
    try {
        const currentPrice = await priceService.getCurrentEthereumPrice(); 

        if (currentPrice === null) {
        return res.status(404).json({
            success: false,
            message: 'No price data available',
        });
        }

        res.status(200).json({
        success: true,
        currentEthPrice: currentPrice,
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: error.message,
        });
    }
};

const getUserExpense = async (req, res) => {
    const { address } = req.params;
    
    try {
        const totalExpenses = await priceService.calculateTotalExpenses(address);
        const currentPrice = await priceService.getCurrentEthereumPrice(); 

        res.status(200).json({
            success: true,
            address,
            totalExpenses,
            currentEthPrice: currentPrice,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getCurrentPrice,
    getUserExpense
};
