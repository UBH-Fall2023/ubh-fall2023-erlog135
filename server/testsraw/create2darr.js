function init_2D_array(rows, columns) {
	let arr = [];
	for (let i = 0; i < columns; i++) {
		arr.push([]);
		for (let j = 0; j < rows; j++) {
			arr[i].push(0);
		}
	}
	return arr;
}

export { init_2D_array };
