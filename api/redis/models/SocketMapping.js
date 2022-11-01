const { Entity, Schema } = require("redis-om");
const clientPromise = require("../");

class SocketMapping extends Entity {}

const socketMappingSchema = new Schema(SocketMapping, {
	username: { type: "string" },
	socketId: { type: "string" },
	lookingForOpponent: { type: "boolean" },
});

module.exports = (async () => {
	const client = await clientPromise;
	const repo = client.fetchRepository(socketMappingSchema);
	repo.createIndex();
	return repo;
})();
