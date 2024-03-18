import { NS } from "@ns";
import { solvers } from "/cct/index";
import { walk } from "/lib/net-walker";
import { tabulate } from "/lib/pretty";

export const main = async (ns: NS) => {
	const log = new Array<Array<string>>();

	await walk(ns, (host) => {
		const ccts = ns.ls(host).filter((x) => x.endsWith(".cct"));

		for (const file of ccts) {
			const type = ns.codingcontract.getContractType(file, host);
			const solver = solvers.get(type);

			if (solver === undefined) {
				log.push([host, file, type, "not implemented", ""]);
				continue;
			}

			const input = ns.codingcontract.getData(file, host);
			const output = solver(input);

			const result = ns.codingcontract.attempt(output, file, host);
			if (result === "") {
				log.push([host, file, type, "failed", ""]);
			} else {
				log.push([host, file, type, "succeeded", result]);
			}
		}
	});

	ns.tprint(`\n${tabulate(log, ["host", "file", "type", "result", "reward"])}`);
};
