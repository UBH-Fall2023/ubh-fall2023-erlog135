function recursive_search(arr, i, e) {
	if (arr[i] == e) {
		return i;
	}
	return recursive_search(arr);
}

export { recursive_search };
