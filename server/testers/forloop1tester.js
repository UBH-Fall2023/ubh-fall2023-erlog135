async function main() {
	let path = process.argv[2];
	const { sum_arr } = await import(path);
	let b = sum_arr([234, 53563, 245, -56, 56, 365, 6, 254, 5, 0]);
	if (b != 54672) process.exit(1);
	process.exit(0);
}

main();
