async function main() {
	let path = process.argv[2];
	const { cardinalFacing } = await import(path);
    let b = cardinalFacing(-100,-24);
	if (b != "w") process.exit(1);
	let c = cardinalFacing(-100,24);
	if (c != "w") process.exit(1);
	let d = cardinalFacing(100,24);
	if (d != "e") process.exit(1);
	let e = cardinalFacing(18,100);
	if (e != "s") process.exit(1);
	let f = cardinalFacing(-18,-100);
	if (f != "n") process.exit(1);
	let g = cardinalFacing(0,0);
	if (g != "s") process.exit(1);

	
	process.exit(0);
}

main();
