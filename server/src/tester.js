import { cwd } from "node:process";
import tests from "../tests/jstests.json" with { type: 'json' };
import { execFile } from 'node:child_process';

class Tester {
	getTests(n) {
		return tests[0]["syntax1"];
	}
}

class JSTester extends Tester {
	test(data, filename) {
		const proc = execFile('node', ['./testers/' + data['tester'], '../user/' + filename], (error, stdout, stderr) => {
			if(error) {
				console.error(error);
			}
			console.log(stdout);
		});
	}
}

let tester = new JSTester();
let test = tester.getTests(1);

console.log(tester.test(test, "john.js"));

export { JSTester };