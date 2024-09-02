const express = require("express");
const transRoute = require("./transaction.routes");
const priceRoute = require('./price.route')

const router = express.Router();

router.use("/transactions", transRoute);
router.use("/user-expense", priceRoute);

module.exports = router