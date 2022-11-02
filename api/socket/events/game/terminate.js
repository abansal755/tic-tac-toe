const gameRepoPromise = require("../../../redis/models/Game");

module.exports = (io, socket) => {
	return async () => {
		const gameRepo = await gameRepoPromise;
		const game = await gameRepo
			.search()
			.where("players")
			.contain(socket.id)
			.first();
		const otherSocketId = game.players.filter(
			(player) => player !== socket.id
		)[0];
		await gameRepo.remove(game.entityId);
		io.of("/").sockets.get(otherSocketId).emit("game:terminate");
	};
};
