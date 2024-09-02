const express = require('express');
const { priceController } = require('../../controllers');

const router = express.Router();

router.get('/current-price', priceController.getCurrentPrice);

router.get('/:address', priceController.getUserExpense);


module.exports = router;
