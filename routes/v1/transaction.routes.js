const express = require('express');
const { transactionController } = require('../../controllers');

const router = express.Router();

router.get("/:address", transactionController.getTransaction)


module.exports = router;