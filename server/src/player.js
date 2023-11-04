class Player {
	id;
	gameId;
	curr_puzz = 0;
	constructor(id, gameId) {
		this.id = id;
		this.gameId = gameId;
	}
}

export { Player };
