const { transService } = require('../services')

const getTransaction = async (req, res) => {
    try {
        const { address } = req.params;

        const transactions = await transService.getTransaction(address);
        res.status(200).send({
            success: true,
            message: 'Transactions fetched and stored successfully',
            transactions,
            });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).send({
        success: false,
        message: 'Error fetching transactions',
        });
    }
}



module.exports = {
    getTransaction,
}