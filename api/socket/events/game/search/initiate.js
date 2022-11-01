const Game = require("../../../../models/Game");
const socketMappingRepo = require("../../../../redis/models/SocketMapping");

module.exports = (io, socket) => {
	return async () => {
		// Update current user's lookingForOpponentStatus
		const socketMapping = await socketMappingRepo
			.search()
			.where("socketId")
			.equalTo(socket.id)
			.first();
		const { username } = socketMapping;
		socketMapping.lookingForOpponent = true;
		await socketMappingRepo.save(socketMapping);

		// Find a random opponent
		const search = socketMappingRepo
			.search()
			.where("lookingForOpponent")
			.equals(true)
			.and("username")
			.not.equal(username);
		const count = await search.returnCount();
		const otherUser = (
			await search.page(Math.floor(Math.random() * count), 1)
		)[0];

		// If no opponent is found
		if (!otherUser)
			return socket.emit("game:search:initiate", {
				error: {
					message: "No opponent found",
				},
			});

		// Opponent found
		// Update both user's lookingForOpponent status
		socketMapping.lookingForOpponent = false;
		await socketMappingRepo.save(socketMapping);
		otherUser.lookingForOpponent = false;
		await socketMappingRepo.save(otherUser);

		// create a Game
		const game = new Game({
			players: [socket.id, otherUser.socketId],
		});
		const styles = ["cross", "cross"];
		const idx = Math.floor(Math.random() * 2);
		styles[idx] = "circle";
		await game.save();

		// Inform both users
		const firstTurn = Math.floor(Math.random() * 2);
		socket.emit("game:search:initiate", {
			opponent: {
				username: otherUser.username,
				socketId: otherUser.socketId,
			},
			style: styles[0],
			yourTurn: firstTurn === 0,
		});
		io.of("/")
			.sockets.get(otherUser.socketId)
			.emit("game:search:initiate", {
				opponent: {
					username,
					socketId: socket.id,
				},
				style: styles[1],
				yourTurn: firstTurn === 1,
			});
	};
};
