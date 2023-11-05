function string_to_numbers(string) {
	let out = [];
	for (let i = 0; i < string.length; i++) {
		out.push(Number.parseInt(string));
	}
	return out;
}

export { string_to_numbers };
