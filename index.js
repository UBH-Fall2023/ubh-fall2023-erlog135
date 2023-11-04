import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const port = 3011;
const server = createServer(app);
const io = new Server(server);

import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { randomInt } from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), "client");

app.use(express.static("client"));
app.use("/g", express.static("client"));
app.get("/", (req, res) => {
	res.sendFile(join(__dirname, "home.html"));
});

app.get("/newgame", (req, res) => {
	res.send(randomInt(1000, 9999).toString());
});

app.get("/g/:room", (req, res) => {
	res.sendFile(join(__dirname, "game.html"));
	console.log(req.params["room"]);
});

io.on("connection", (socket) => {
	console.log("connection established");
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
