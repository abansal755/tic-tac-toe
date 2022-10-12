const Game = require('../../models/Game');
const SocketMapping = require('../../models/SocketMapping');

module.exports = (io,socket) => {
    return async () => {
        // delete socket mapping
        await SocketMapping.findOneAndDelete({ socketId: socket.id });
        
        // terminate if part of any game
        const game = await Game.findOneAndDelete({
            players: socket.id
        }).exec();
        if(!game) return;
        const otherSocketId = game.players.filter(player => player !== socket.id)[0];
        io.of('/').sockets.get(otherSocketId).emit('game:terminate');
    }
}