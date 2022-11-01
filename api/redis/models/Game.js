const { Entity, Schema } = require("redis-om");
const { client } = require("../");

class Game extends Entity {}

const gameSchema = new Schema(Game, {
	players: { type: "string[]" },
});

module.exports = client.fetchRepository(gameSchema);
