const { Client } = require("redis-om");

exports.client = new Client();

exports.connect = (url) => {
	exports.client.open(url);
};
