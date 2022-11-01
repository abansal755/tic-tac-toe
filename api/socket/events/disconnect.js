const Game = require("../../models/Game");
const socketMappingRepo = require("../../redis/models/SocketMapping");

module.exports = (io, socket) => {
	return async () => {
		// delete socket mapping
		const socketMapping = await socketMappingRepo
			.search()
			.where("socketId")
			.equals(socket.id)
			.returnFirst();
		await socketMappingRepo.remove(socketMapping.entityId);

		// terminate if part of any game
		const game = await Game.findOneAndDelete({
			players: socket.id,
		}).exec();
		if (!game) return;
		const otherSocketId = game.players.filter(
			(player) => player !== socket.id
		)[0];
		io.of("/").sockets.get(otherSocketId).emit("game:terminate");
	};
};
