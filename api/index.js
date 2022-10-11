require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const SocketMapping = require('./models/SocketMapping');
const setupSocket = require('./socket');

const app = express();

(async () => {
    const DB_URL = process.env.DB_URL || 'mongodb://localhost/tic-tac-toe-api';
    await mongoose.connect(DB_URL);
    console.log('MongoDB is running');
})();

const PORT = process.env.PORT || 4000;
const httpServer = app.listen(PORT, console.log(`Listening to port ${PORT}`));

app.use(express.json());

(async () => {
    await SocketMapping.deleteMany({});
})();

setupSocket(httpServer);