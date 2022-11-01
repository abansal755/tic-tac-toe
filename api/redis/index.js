const { Client } = require("redis-om");

const client = new Client();

module.exports = client.open(process.env.REDIS_URL || "redis://localhost:6379");
