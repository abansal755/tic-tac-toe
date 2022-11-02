const gameRepoPromise = require("../../redis/models/Game");
const socketMappingRepoPromise = require("../../redis/models/SocketMapping");

module.exports = (io, socket) => {
	return async () => {
		// delete socket mapping
		const socketMappingRepo = await socketMappingRepoPromise;
		const socketMapping = await socketMappingRepo
			.search()
			.where("socketId")
			.equals(socket.id)
			.returnFirst();
		await socketMappingRepo.remove(socketMapping.entityId);

		// terminate if part of any game
		const gameRepo = await gameRepoPromise;
		const game = await gameRepo
			.search()
			.where("players")
			.contain(socket.id)
			.first();
		if (!game) return;
		const otherSocketId = game.players.filter(
			(player) => player !== socket.id
		)[0];
		io.of("/").sockets.get(otherSocketId).emit("game:terminate");
	};
};
