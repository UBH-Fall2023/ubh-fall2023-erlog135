async function main() {
	let path = process.argv[2];
	const { recursive_search } = await import(path);
	let b = recursive_search([11, 36, 8, 92, 735, 9, 0, 5, 4], 0, 9);
	if (b != 5) process.exit(1);
	process.exit(0);
}

main();
