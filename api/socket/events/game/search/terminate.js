const socketMappingRepo = require("../../../../redis/models/SocketMapping");

module.exports = (io, socket) => {
	return async () => {
		const socketMapping = await socketMappingRepo
			.search()
			.where("socketId")
			.equals(socket.id)
			.first();
		socketMapping.lookingForOpponent = false;
		await socketMappingRepo.save(socketMapping);
	};
};
