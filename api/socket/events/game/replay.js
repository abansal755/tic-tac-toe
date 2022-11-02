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

		const styles = ["cross", "cross"];
		const idx = Math.floor(Math.random() * 2);
		styles[idx] = "circle";

		const firstTurn = Math.floor(Math.random() * 2);
		socket.emit("game:replay", {
			style: styles[0],
			yourTurn: firstTurn === 0,
		});
		io.of("/")
			.sockets.get(otherSocketId)
			.emit("game:replay", {
				style: styles[1],
				yourTurn: firstTurn === 1,
			});
	};
};
