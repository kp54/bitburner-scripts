import { NS } from "@ns";
import { findOptimTargets } from "/lib/find-optim-targets";

export const main = async (ns: NS) => {
	let limit = 5;
	if (ns.args.length === 1) {
		limit = Number(ns.args[0]);
	}

	const hosts = await findOptimTargets(ns, limit);

	const lines = hosts
		.map((x) => `${x.host}: ${ns.formatNumber(x.score)}`)
		.join("\n");
	ns.tprint(`\n${lines}`);
};
