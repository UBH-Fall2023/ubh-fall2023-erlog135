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
		this.io
			.to(this.players[player].gameId)
			.emit("player-joined", player, nickname);
	}

	startGame(player) {
		games[players[player].gameId].startGame();
	}

	submitPuzzle(player, player_code) {
		//todo
	}
}

export { GameManager };
