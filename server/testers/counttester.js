async function main() {
	let path = process.argv[2];
	const { count } = await import(path);
	let b = count(6);
	if (b != 6) process.exit(1);
	process.exit(0);
}

main();
