const { Entity, Schema } = require("redis-om");
const clientPromise = require("../");

class Game extends Entity {}

const gameSchema = new Schema(Game, {
	players: { type: "string[]" },
});

module.exports = (async () => {
	const client = await clientPromise;
	const repo = client.fetchRepository(gameSchema);
	repo.createIndex();
	return repo;
})();
