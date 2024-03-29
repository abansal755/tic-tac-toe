const axios = require('axios');
const https = require('https');
const fs = require('fs');
const path = require('path');

const AUTH_SERVER_URL = process.env.AUTH_SERVER_URL || 'http://localhost:3000';

const options = {
    baseURL: AUTH_SERVER_URL
};

if(process.env.NODE_ENV === 'production'){
    const httpsAgent = new https.Agent({
        key: fs.readFileSync(path.join(__dirname,'../../cert/key.pem')),
        cert: fs.readFileSync(path.join(__dirname,'../../cert/akshitbansal_me.crt')),
        ca: fs.readFileSync(path.join(__dirname,'../../cert/akshitbansal_me.ca-bundle'))
    });
    options.httpsAgent = httpsAgent;
}

module.exports = axios.create(options);