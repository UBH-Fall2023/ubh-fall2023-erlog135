function selection_sort(arr) {
	for (let i = 0; i < arr.length; i++) {
		let max = arr[i];
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] > arr[max]) {
				max = j;
			}
		}
		if (max !== i) {
			let t = arr[i];
			arr[i] = arr[max];
			arr[max] = t;
		}
	}
	return arr;
}

export { selection_sort };
