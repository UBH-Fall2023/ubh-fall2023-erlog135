function selection_sort(arr) {
	for (let i = 0; i < arr.length; i++) {
		let max = i;
		for (let j = i + 1; j < arr.length; j++) {
			if (arr[j] > arr[max]) {
				max = j;
			}
		}
		if (max !== i) {
			arr[i] = arr[max];
			arr[max] = arr[i];
		}
	}
	return arr;
}

export { selection_sort };
