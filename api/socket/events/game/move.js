const gameRepoPromise = require("../../../redis/models/Game");

module.exports = (io, socket) => {
	return async (idx) => {
		const gameRepo = await gameRepoPromise;
		const game = await gameRepo
			.search()
			.where("players")
			.contain(socket.id)
			.first();
		const otherSocketId = game.players.filter(
			(player) => player !== socket.id
		)[0];
		io.of("/").sockets.get(otherSocketId).emit("game:move", idx);
	};
};
