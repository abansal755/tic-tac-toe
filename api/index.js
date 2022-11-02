require("dotenv").config();

const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const setupSocket = require("./socket");
const client = require("./redis");
const socketMappingRepoPromise = require("./redis/models/SocketMapping");
const gameRepoPromise = require("./redis/models/Game");

const app = express();

(async () => {
	await client;
	console.log("Redis connected");

	if (process.env.NODE_ENV !== "production") {
		[socketMappingRepoPromise, gameRepoPromise].forEach(async (promise) => {
			const repo = await promise;
			const ids = await repo.search().allIds();
			ids.forEach((id) => {
				repo.remove(id);
			});
		});
	}
})();

app.use(express.json());

const PORT = process.env.PORT || 4000;
let httpServer;
if (process.env.NODE_ENV === "production") {
	httpServer = https.createServer(
		{
			key: fs.readFileSync(path.join(__dirname, "../cert/key.pem")),
			cert: fs.readFileSync(
				path.join(__dirname, "../cert/akshitbansal_me.crt")
			),
		},
		app
	);
	httpServer.listen(PORT, console.log(`Listening to port ${PORT}`));
} else httpServer = app.listen(PORT, console.log(`Listening to port ${PORT}`));

setupSocket(httpServer);
