const socketMappingRepoPromise = require("../../redis/models/SocketMapping");

module.exports = (io, socket) => {
	return async () => {
		const socketMappingRepo = await socketMappingRepoPromise;
		const count = await socketMappingRepo.search().returnCount();
		socket.emit("stats", count);
	};
};
