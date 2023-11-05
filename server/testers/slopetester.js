async function main() {
	let path = process.argv[2];
	const { calculate_slope } = await import(path);
	let b = calculate_slope({ x: 5, y: 10 }, { x: 3, y: 5 });
	if (b != 5 / 2) process.exit(1);
	process.exit(0);
}

main();
