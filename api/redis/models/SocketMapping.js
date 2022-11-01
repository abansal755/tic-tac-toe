const { Entity, Schema } = require("redis-om");
const { client } = require("../");

class SocketMapping extends Entity {}

const socketMappingSchema = new Schema(SocketMapping, {
	username: { type: "string" },
	socketId: { type: "string" },
	lookingForOpponent: { type: "boolean" },
});

module.exports = client.fetchRepository(socketMappingSchema);
