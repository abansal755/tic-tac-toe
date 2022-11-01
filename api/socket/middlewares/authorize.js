const axios = require("../../lib/axios");
const socketMappingRepoPromise = require("../../redis/models/SocketMapping");

module.exports = async (socket, next) => {
	const { token } = socket.handshake.auth;
	if (!token) return next(new Error("Token not found"));
	try {
		const res = await axios.get("/api/users", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		const { username } = res.data;

		const socketMappingRepo = await socketMappingRepoPromise;
		const socketMapping = socketMappingRepo.createEntity({
			username,
			socketId: socket.id,
			lookingForOpponent: false,
		});
		await socketMappingRepo.save(socketMapping);

		next();
	} catch (err) {
		next(err);
	}
};
