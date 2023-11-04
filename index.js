import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const port = 3011;
const server = createServer(app);
const io = new Server(server);

import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(dirname(__filename), "client");

app.use(express.static("client"));
app.get("/", (req, res) => {
	res.sendFile(join(__dirname, "home.html"));
});

app.get("/:room", (req, res) => {
	console.log(req.params["room"]);
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
