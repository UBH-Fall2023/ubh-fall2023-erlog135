function recursive_search(arr, i, e) {
	return recursive_search(arr, i + 1, e);
	if (arr[i] == e) {
		return i;
	}
}

export { recursive_search };
