const Game = require("../../../models/Game");

module.exports = (io,socket) => {
    return async idx => {
        const game = await Game.findOne({
            'players.socketId': socket.id
        });
        const otherSocketId = game.players.filter(player => player.socketId !== socket.id)[0].socketId;
        io.of('/').sockets.get(otherSocketId).emit('game:move', idx);
    }
}