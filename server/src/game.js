import { writeFile } from "fs";
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
		if (this.players.hasOwnProperty(player)) return -1;
		if (this.pc >= Game.MAX_PLAYERS) return -1;
		this.pc++;
		this.players[player.id] = player;
		if (this.pc == 0) {
			this.io.to(player.id).emit("chosen-one");
		}
		return 0;
	}

	leave(player) {
		this.pc--;
		this.io.to(this.id).emit("player-leave", player);
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
					"server/testsraw/" +
						this.puzzles[0]["content"]["brokenpath"]
				)
			).text(),
		};

		this.io.to(id).emit("new-puzzle", puzz);
	}

	async submitPuzzle(pid, input_code) {
		let player = this.players[pid];
		let puzzle_data = this.puzzles[player.curr_puzz];
		let r = -1;
		writeFile(
			"/server/user/" + pid.toString() + ".js",
			input_code,
			async () => {
				r = await this.tester.test(puzzle_data, pid.toString() + ".js");
			}
		);
		if (r == 0) {
			player.curr_puzz++;
			if (player.curr_puzz >= this.puzzleCount) {
				//win state
				//do later
				//after you fix all the broken shit
			}
			this.sendNextPuzz(player);
		} else {
			this.failedPuzz(player);
		}
	}

	async sendNextPuzz(player) {
		const puzz = {
			name: this.puzzles[player.curr_puzz]["name"],
			description:
				this.puzzles[player.curr_puzz]["content"]["description"],
			code: await (
				await fetch(
					"server/testsraw/" +
						this.puzzles[player.curr_puzz]["content"]["brokenpath"]
				)
			).text(),
		};
		this.io.to(player.id).emit("new-puzzle", puzz);
	}

	failedPuzz(player) {
		this.io.to(player.id).emit("failed-puzzle");
	}
}

export { Game };
