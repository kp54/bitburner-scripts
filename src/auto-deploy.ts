import { NS } from "@ns";
import { autoDeploy } from "/lib/auto-deploy";
import { showMissing } from "/lib/hack-kit";

export const main = async (ns: NS) => {
	if (ns.args.length !== 1) {
		ns.tprint("usage: auto-deploy TARGET");
		return;
	}

	const target = String(ns.args[0]);
	if (showMissing(ns, [target])) {
		return;
	}

	while (true) {
		await autoDeploy(ns, target);
		await ns.asleep(60 * 1000);
	}
};
