import tests from "../tests/jstests.json" with { type: "json" };
import util from "node:util";
import { execFile } from 'node:child_process';
import { randomInt } from "node:crypto";
const asyncExec = util.promisify(execFile);

class Tester {
	getTests(n) {
		let diffs = Object.keys(tests).length;
		let diff = 0;
		let out = [];
		while(n > 0) {
			if(diff >= diffs) diff = 0;

			let randpuzz = Object.keys(tests[diff])[randomInt(0, Object.keys(tests[diff]).length)];
			out.push({"name": randpuzz, "content": tests[diff][randpuzz]});
			// console.log(randpuzz);
			n--;
			diff++;
		}
		return  out;
	}
}

class JSTester extends Tester {
	async test(data, filename) {
		try{
			const { error, stdout, stderr } = await asyncExec('node', ['./server/testers/' + data['tester'], '../user/' + filename]);
			if(error) {
				console.error(error);
				return -1;
			}
			return 0;
		} catch {
			return -1;
		}
		
	}
}

export { JSTester };