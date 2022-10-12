const SocketMapping = require('../../models/SocketMapping');

module.exports = (io,socket) => {
    return async () => {
        const count = await SocketMapping.estimatedDocumentCount();
        socket.emit('stats', count);
    }
}