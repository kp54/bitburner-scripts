import { NS } from "@ns";
import { solvers } from "/cct/index";
import { walk } from "/lib/net-walker";
import { tabulate } from "/lib/pretty";

export const main = async (ns: NS) => {
	const ccts = new Array<Array<string>>();

	await walk(ns, (host) => {
		if (host === ns.getHostname()) {
			return;
		}

		const files = ns.ls(host).filter((x) => x.endsWith(".cct"));

		for (const file of files) {
			const type = ns.codingcontract.getContractType(file, host);
			const solver = String(solvers.get(type) !== undefined);
			ccts.push([host, file, type, solver]);
		}
	});

	ns.tprint(`\n${tabulate(ccts, ["host", "file", "type", "solver"])}`);
};
