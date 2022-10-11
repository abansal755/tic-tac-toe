const { Server } = require('socket.io');
const authorize = require('./middlewares/authorize');
const path = require('path');
const wrapAsync = require('../utils/wrapAsync');
const getContents = require('../utils/getContents');

module.exports = httpServer => {
    const io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:5000'
        }
    });

    io.use(authorize);

    io.on('connection', async socket => {
        const eventHandlers = await getContents(path.join(__dirname,'events'))
        for(const abs of eventHandlers){
            let rel = path.relative(path.join(__dirname,'events'),abs);
            rel = rel.replaceAll('\\',':').replace('.js','');
            socket.on(rel, wrapAsync(require(abs)(io,socket)));
        }
    })
}