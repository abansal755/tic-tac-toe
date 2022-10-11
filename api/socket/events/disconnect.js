const Game = require('../../models/Game');
const SocketMapping = require('../../models/SocketMapping');

module.exports = (io,socket) => {
    return async () => {
        // delete socket mapping
        await SocketMapping.findOneAndDelete({ socketId: socket.id });
        
        // terminate if part of any game
        const game = await Game.findOneAndDelete({
            'players.socketId': socket.id
        }).exec();
        if(!game) return;
        const otherSocketId = game.players.filter(player => player.socketId !== socket.id)[0].socketId;
        io.of('/').sockets.get(otherSocketId).emit('game:terminate');
    }
}