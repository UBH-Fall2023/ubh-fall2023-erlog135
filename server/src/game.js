import { readFileSync } from "fs";
import { JSTester } from "./tester.js";

class Game {
	static MAX_PLAYERS = 16;

	players = {};
	io;
	id;
	running = false;
	pc = 0;

	puzzleCount = 1;

	constructor(io, id) {
		this.io = io;
		this.id = id;
	}

	join(player) {
		if (this.running) return -1;
		if (this.players.contains(player)) return -1;
		if (pc >= Game.MAX_PLAYERS) return -1;
		pc++;
		this.players[player.id] = player;
		if (pc == 0) {
			this.io.to(player.id).emit("chosen-one");
		}
		return 0;
	}

	leave(player) {
		pc--;
		this.io.to(id).emit("disconnect", player);
		delete this.players[player];
	}

	async startGame() {
		this.running = true;
		//create tester and fetch puzzles
		this.tester = new JSTester();
		this.puzzles = this.tester.getTests(5);
		this.io.to(id).emit("game-start");

		const puzz = {
			name: this.puzzles[0]["name"],
			description: this.puzzles[0]["content"]["description"],
			code: await (
				await fetch(
					"server/testsraw/" + puzzle[0]["content"]["brokenpath"]
				)
			).text(),
		};

		this.io.to(id).emit("new-puzzle", puzz);
	}
}

export { Game };
