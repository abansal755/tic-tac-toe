require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const https = require("https");
const fs = require("fs");
const path = require("path");
const setupSocket = require("./socket");
const client = require("./redis");

const app = express();

(async () => {
	const DB_URL = process.env.DB_URL || "mongodb://localhost/tic-tac-toe-api";
	await mongoose.connect(DB_URL);
	console.log("MongoDB is running");
})();

(async () => {
	await client;
	console.log("Redis connected");
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
