async function main() {
	let path = process.argv[2];
	const { very_last_in_arrays } = await import(path);
	let b = very_last_in_arrays([
		[1],
		[7, 8, 9],
		[6, 2, 1],
		[0, 0, 0],
		[8, 9, 6],
		[5, 6, 7],
		[1, 1, 3],
	]);
	if (b != 3) process.exit(1);
	process.exit(0);
}

main();
