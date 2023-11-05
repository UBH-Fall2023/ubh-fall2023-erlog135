async function main() {
	let path = process.argv[2];
	const { has_key } = await import(path);
	let b = has_key({ a: 0 }, "b");
	if (b == false) process.exit(0);
	process.exit(1);
}

main();
