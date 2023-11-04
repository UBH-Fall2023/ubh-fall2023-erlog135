async function main() {
	let path = process.argv[2];
	const { add } = await import(path);
	let b = add(5, 5);
	if (b != 10) process.exit(1);
}

main();
