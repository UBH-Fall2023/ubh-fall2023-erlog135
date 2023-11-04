import { cwd } from "node:process";
import tests from "../tests/jstests.json" with { type: 'json' };
import util from "node:util";
import { execFile } from 'node:child_process';
const asyncExec = util.promisify(execFile);

class Tester {
	getTests(n) {
		return {"name": "syntax1", "content": tests[0]["syntax1"] };
	}
}

class JSTester extends Tester {
	async test(data, filename) {
		const { error, stdout, stderr } = await asyncExec('node', ['./testers/' + data['tester'], '../user/' + filename]);
		if(error) {
			return -1;
		}
		return 0;
	}
}

export { JSTester };