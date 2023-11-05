async function main() {
	let path = process.argv[2];
	const { hypotenuse } = await import(path);
	let b = hypotenuse(3, 4);
	if (b != 5) process.exit(1);
	process.exit(0);
}

main();
