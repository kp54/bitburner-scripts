import { NS } from "@ns";
import { solvers } from "/cct/index";
import { walk } from "/lib/net-walker";

export const solveCcts = async (ns: NS) => {
	await walk(ns, (host) => {
		const ccts = ns.ls(host).filter((x) => x.endsWith(".cct"));
		for (const cct of ccts) {
			const type = ns.codingcontract.getContractType(cct, host);
			const solver = solvers.get(type);

			if (solver === undefined) {
				continue;
			}

			const input = ns.codingcontract.getData(cct, host);
			const output = solver(input);
			const result = ns.codingcontract.attempt(output, cct, host);

			if (result === "") {
				throw new Error();
			}
		}
	});
};
