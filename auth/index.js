require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const wrapAsync = require('./utils/wrapAsync');
const https = require('https');
const fs= require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
let httpServer;
if(process.env.NODE_ENV === 'production'){
    httpServer = https.createServer({
        key: fs.readFileSync(path.join(__dirname,'../cert/key.pem')),
        cert: fs.readFileSync(path.join(__dirname,'../cert/akshitbansal_me.crt'))
    }, app);
    httpServer.listen(PORT,console.log(`Listening to port ${PORT}`));
}
else httpServer = app.listen(PORT, console.log(`Listening to port ${PORT}`));

(async () => {
    const DB_URL = process.env.DB_URL || 'mongodb://localhost/auth-server';
    await mongoose.connect(DB_URL);
    console.log('MongoDB running');
})();

app.use(express.json());

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

const routes = require('./routes.json');
routes.forEach(route => {
    const controller = require(path.join(__dirname,'controllers',route.path,`${route.method}.js`));
    const middlewares = [];
    if(route.middlewares){
        route.middlewares.forEach(middleware => {
            middlewares.push(wrapAsync(require(path.join(__dirname,'middlewares',`${middleware}.js`))));
        })
    }
    app[route.method.toLowerCase()](route.path, ...middlewares, wrapAsync(controller));
});

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || 'Some error occured' });
})