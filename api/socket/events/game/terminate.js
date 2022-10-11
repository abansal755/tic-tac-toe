const Game = require("../../../models/Game");

module.exports = (io,socket) => {
    return async () => {
        const game = await Game.findOneAndDelete({
            'players.socketId': socket.id
        }).exec();
        const otherSocketId = game.players.filter(player => player.socketId !== socket.id)[0].socketId;
        io.of('/').sockets.get(otherSocketId).emit('game:terminate');
    }
}