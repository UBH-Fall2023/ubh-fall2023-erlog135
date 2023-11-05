import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { GameManager } from "./server/src/game_manager.js";

const app = express();
const port = 3011;
const server = createServer(app);
const io = new Server(server);

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), "client");

const gameManager = new GameManager(io);

app.use(express.static("client"));
app.use("/g", express.static("client"));
app.get("/", (req, res) => {
	res.sendFile(join(__dirname, "home.html"));
});

app.get("/newgame", (req, res) => {
	res.send(gameManager.createGame().toString());
});

app.get("/g/:room", (req, res) => {
	res.sendFile(join(__dirname, "game.html"));
});

io.on("connection", (socket) => {
	console.log("connection established");
	if (socket.handshake.headers.room == undefined) return;
	let state = gameManager.playerJoin(
		socket.handshake.headers.room,
		socket.id
	);
	if (state == 0) {
		socket.join(gameManager.getGame(socket.id));
		socket.join(socket.id);
	} else {
		socket.join(socket.id);
		io.to(socket.id).emit("failed-connect");
		return;
	}

	socket.on("disconnect", () => {
		gameManager.playerLeft(socket.id);
	});

	socket.on("nick-name", (name) => {
		gameManager.setPlayerName(socket.id, name);
	});

	socket.on("start-game", () => {
		gameManager.startGame(socket.id);
	});

	socket.on("submit", (puzzle, user_code) => {
		gameManager.submitPuzzle(socket.id, puzzle, user_code);
	});
});

server.listen(port, () => {
	console.log(`listening on port ${port}`);
});
