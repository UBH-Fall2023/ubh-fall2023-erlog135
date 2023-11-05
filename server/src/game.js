import { readFile, writeFile } from "fs/promises";
import { JSTester } from "./tester.js";
import { randomInt } from "crypto";

class Game {
	static MAX_PLAYERS = 16;

	players = {};
	io;
	id;
	running = false;
	pc = 0;

	puzzleCount = 5;

	constructor(io, id) {
		this.io = io;
		this.id = id;
	}

	join(player) {
		if (this.running) return -1;
		if (this.players.hasOwnProperty(player)) return -1;
		if (this.pc >= Game.MAX_PLAYERS) return -1;
		this.players[player.id] = player;
		if (this.pc == 0) {
			this.io.to(player.id).emit("chosen-one");
			this.chosen = player.id;
		}
		this.pc++;
		return 0;
	}

	leave(player) {
		this.pc--;
		delete this.players[player];
		this.io.to(this.id).emit("player-leave", player);
		if (this.pc < 1) return;
		if (this.chosen == player) {
			let p =
				this.players[
					Object.keys(this.players)[
						randomInt(0, Object.keys(this.players).length)
					]
				];
			this.chosen = p.id;
			this.io.to(p.id).emit("chosen-one");
		}
	}

	async startGame() {
		this.running = true;
		//create tester and fetch puzzles
		this.tester = new JSTester();
		this.puzzles = this.tester.getTests(this.puzzleCount);
		this.io.to(this.id).emit("game-start");

		let g = await readFile(
			"server/testsraw/" + this.puzzles[0]["content"]["brokenpath"],
			"utf8"
		);

		let puzz = {
			name: this.puzzles[0]["name"],
			description: this.puzzles[0]["content"]["description"],
			code: g,
		};
		this.io.to(this.id).emit("new-puzzle", puzz);
	}

	async submitPuzzle(pid, input_code) {
		if (!this.running) return;
		let player = this.players[pid];
		let puzzle_data = this.puzzles[player.curr_puzz];
		await writeFile("server/user/" + pid.toString() + ".js", input_code);
		let r = await this.tester.test(
			puzzle_data["content"],
			pid.toString() + ".js"
		);
		if (r == 0) {
			this.io.to(player.id).emit("passed-puzzle");
			player.curr_puzz++;
			if (player.curr_puzz >= this.puzzleCount) {
				this.running = false;
				for (const k in this.players) {
					this.players[k].curr_puzz = 0;
				}
				this.puzzles = [];
				this.io.to(this.id).emit("game-end", player.id);
				return;
			}
			this.sendNextPuzz(player);
		} else {
			this.failedPuzz(player);
		}
	}

	async sendNextPuzz(player) {
		const g = await readFile(
			"server/testsraw/" +
				this.puzzles[player.curr_puzz]["content"]["brokenpath"],
			"utf8"
		);
		const puzz = {
			name: this.puzzles[player.curr_puzz]["name"],
			description:
				this.puzzles[player.curr_puzz]["content"]["description"],
			code: g,
		};
		this.io.to(player.id).emit("new-puzzle", puzz);
	}

	failedPuzz(player) {
		this.io.to(player.id).emit("failed-puzzle");
	}
}

export { Game };
