const axios = require('axios');

const AUTH_SERVER_URL = process.env.AUTH_SERVER_URL || 'http://localhost:3000';

module.exports = axios.create({
    baseURL: AUTH_SERVER_URL
});