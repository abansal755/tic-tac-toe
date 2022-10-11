const SocketMapping = require("../../../../models/SocketMapping")

module.exports = (io,socket) => {
    return async () => {
        await SocketMapping.findOneAndUpdate({ socketId: socket.id }, { lookingForOpponent: false });
    }
}