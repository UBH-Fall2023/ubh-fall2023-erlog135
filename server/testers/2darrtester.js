async function main() {
	let path = process.argv[2];
	const { init_2D_array } = await import(path);
	let b = init_2D_array(3, 5);
	if (b.length != 3) process.exit(1);
	if (b[0].length != 5) process.exit(1);
	process.exit(0);
}

main();
