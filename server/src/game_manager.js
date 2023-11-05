import { randomInt } from "crypto";
import { Game } from "./game.js";
import { Player } from "./player.js";

class GameManager {
	//object mapping game ids to game objects
	games = {};
	//object mapping player ids to player objects
	players = {};
	//reference to socket io object
	io;

	constructor(io) {
		this.io = io;
	}

	getGame(player) {
		return this.players[player].gameId;
	}

	createGame() {
		let id = randomInt(1000, 9999);
		this.games[id.toString()] = new Game(this.io, id.toString());
		return id;
	}

	playerJoin(game, player) {
		if (!this.games.hasOwnProperty(game)) return -1;
		this.players[player] = new Player(player, game);
		return this.games[game.toString()].join(this.players[player]);
	}

	playerLeft(player) {
		this.games[this.players[player].gameId].leave(player);
		delete this.players[player];
	}

	setPlayerName(player, nickname) {
		this.players[player].nickname = nickname;
		let tp = {};
		for (const p in this.players) {
			tp[p] = p.nickname;
		}
		this.io.to(this.players[player].gameId).emit("players", tp);
	}

	startGame(player) {
		games[players[player].gameId].startGame();
	}

	submitPuzzle(player, puzzle_id, player_code) {
		this.games[this.players[player]].submitPuzzle(
			player,
			puzzle_id,
			player_code
		);
	}
}

export { GameManager };
