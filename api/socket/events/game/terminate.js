const Game = require("../../../models/Game");

module.exports = (io,socket) => {
    return async () => {
        const game = await Game.findOneAndDelete({
            players: socket.id
        }).exec();
        const otherSocketId = game.players.filter(player => player !== socket.id)[0];
        io.of('/').sockets.get(otherSocketId).emit('game:terminate');
    }
}