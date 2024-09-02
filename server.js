require('dotenv').config()
const app = require('./app');
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
const DB_URI= process.env.DB_URI || 'mongodb://localhost:27017/crypto-transactions';

mongoose.connect(DB_URI).then(() => {
    console.log('DB connected successfully');
}).catch(() => {
    console.log("DB connection failed");
})



app.listen(port, () => {
    console.log("Server running on port", port);
})