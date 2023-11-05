async function main() {
	let path = process.argv[2];
    let passed = true;
	const { valueIfEqual } = await import(path);
	let b = valueIfEqual(1,2);
	if (b != -1) passed = false;
    b = valueIfEqual(2,2);
	if (b != 2) passed = false;

    if(passed){
        process.exit(0);
    }
	process.exit(1);
}

main();