async function main() {
	let path = process.argv[2];
	const { string_to_numbers } = await import(path);
	let b = string_to_numbers(6580134875);

	let a = [6, 5, 8, 0, 1, 3, 4, 8, 7, 5];
	for (let i = 0; i < a.length; i++) {
		if (a[i] != b[i]) process.exit(1);
	}
	process.exit(0);
}

main();
