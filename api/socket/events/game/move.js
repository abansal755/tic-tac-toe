const Game = require("../../../models/Game");

module.exports = (io,socket) => {
    return async idx => {
        const game = await Game.findOne({
            players: socket.id
        });
        const otherSocketId = game.players.filter(player => player !== socket.id)[0];
        io.of('/').sockets.get(otherSocketId).emit('game:move', idx);
    }
}