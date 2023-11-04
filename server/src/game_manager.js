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

	createGame() {
		let id = randomInt(1000, 9999);
		this.games[id] = new Game(io, id);
		return id;
	}

	playerJoined(game, player) {
		this.players[player] = new Player(player, game);
		return this.games[game].join(players[player]);
	}

	playerLeft(player) {
		this.games[player.gameId].leave(player);
		delete this.players[player];
	}

	setPlayerName(player, nickname) {
		this.players[player].nickname = nickname;
		this.io
			.to(players[player].gameId)
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
