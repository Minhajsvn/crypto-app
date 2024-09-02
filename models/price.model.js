const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
    price: Number,
    currency: String,
    fetchedAt: { type: Date, default: Date.now },
});

const Price = mongoose.model('Price', priceSchema);


module.exports = Price;