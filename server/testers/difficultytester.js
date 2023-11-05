async function main() {
	let path = process.argv[2];
	const { difficulty } = await import(path);
    let b = difficulty(12732);
	if (b != 1000) process.exit(1);
	let c = difficulty(-323);
	if (c != 0) process.exit(1);
	let d = difficulty(420);
	if (c != 420) process.exit(1);
	process.exit(0);
}

main();
