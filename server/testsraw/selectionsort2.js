function selection_sort(arr) {
	let out = [];
	let max = 0;
	let index = 0;
	while (arr.length > 0) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] > max) {
				max = i;
				index = arr[i];
			}
		}
		out.push(max);
		arr.splice(i, 1);
	}
	return out;
}

export { selection_sort };
