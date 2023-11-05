async function main() {
	let path = process.argv[2];
	const { selection_sort } = await import(path);
	let b = selection_sort([3, 7, 8, 1, 9, 6, 0]);
	let a = [9, 8, 7, 6, 3, 1, 0];
	console.log(b);
	for (let i = 0; i < a.length; i++) {
		if (a[i] != b[i]) process.exit(1);
	}
	process.exit(0);
}

main();
