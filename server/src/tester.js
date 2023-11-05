import { cwd } from "node:process";
import tests from "../tests/jstests.json" with { type: "json" };
import util from "node:util";
import { execFile } from 'node:child_process';
import { randomInt } from "node:crypto";
const asyncExec = util.promisify(execFile);

class Tester {
	getTests(n) {
		let perdiff = Math.ceil(Object.keys(tests).length / n);
		let ex = n % Object.keys(tests).length;
		let out = [];
		for (let i = 0; i < Object.keys(tests).length; i++) {
			for (let j = 0; j < perdiff; j++) {
				let randpuzz = Object.keys(tests[i])[randomInt(0, Object.keys(tests[i]).length)];
				out.push({"name": randpuzz, "content": tests[i][randpuzz]});
			}
			if(ex > 0) {
				j--;
				ex--;
			}
		}
		return  out;
	}
}

class JSTester extends Tester {
	async test(data, filename) {
		try{
			const { error, stdout, stderr } = await asyncExec('node', ['./server/testers/' + data['tester'], '../user/' + filename]);
			if(error) {
				return -1;
			}
			return 0;
		} catch {
			return -1;
		}
		
	}
}

export { JSTester };