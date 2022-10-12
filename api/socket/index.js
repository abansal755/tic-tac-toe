const { Server } = require('socket.io');
const authorize = require('./middlewares/authorize');
const path = require('path');
const wrapAsync = require('../utils/wrapAsync');
const getContents = require('../utils/getContents');

module.exports = async httpServer => {
    const FRONTEND_SERVER_URL = process.env.FRONTEND_SERVER_URL || 'http://localhost:5000';
    
    const io = new Server(httpServer, {
        cors: {
            origin: FRONTEND_SERVER_URL
        }
    });

    io.use(authorize);

    const eventHandlers = await getContents(path.join(__dirname,'events'));
    io.on('connection', socket => {
        for(const abs of eventHandlers){
            let rel = path.relative(path.join(__dirname,'events'),abs);
            rel = rel.replaceAll('\\',':').replaceAll('/',':').replace('.js','');
            socket.on(rel, wrapAsync(require(abs)(io,socket)));
        }
    })
}