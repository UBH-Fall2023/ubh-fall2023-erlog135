async function main() {
	let path = process.argv[2];
	const { zeroPad } = await import(path);
    let b = zeroPad(12732,10);
	if (b != "0000012732") process.exit(1);
	process.exit(0);
}

main();
