const socketMappingRepo = require("../../redis/models/SocketMapping");

module.exports = (io, socket) => {
	return async () => {
		const count = await socketMappingRepo.search().returnCount();
		socket.emit("stats", count);
	};
};
