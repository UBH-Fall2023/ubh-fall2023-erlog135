function sum_arr(arr) {
	let sum = 0;
	for (let i = 0; i < arr.length; i++) {
		sum = arr[i] + arr[i];
	}
	return sum;
}

export { sum_arr };
