require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const wrapAsync = require('./utils/wrapAsync');

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));

(async () => {
    await mongoose.connect('mongodb://localhost/auth-server');
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