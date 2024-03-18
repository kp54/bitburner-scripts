import { NS } from "@ns";
import { showMissing } from "/lib/hack-kit";
import { useHome } from "/lib/use-home";

export const main = (ns: NS) => {
	if (ns.args.length !== 1) {
		ns.tprint("usage: fill TARGET");
		return;
	}

	const target = String(ns.args[0]);
	if (showMissing(ns, [target])) {
		return;
	}

	useHome(ns, target);
};
