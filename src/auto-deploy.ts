import { NS } from "@ns";
import { openNuke, showMissing, startHack } from "lib/hack-kit";
import { walk } from "lib/net-walker";

export const autoDeploy = async (ns: NS, target: string) => {
	const knownHosts = new Set<string>([ns.getHostname()]);

	await walk(ns, (host) => {
		if (knownHosts.has(host) || !openNuke(ns, host)) {
			return;
		}

		knownHosts.add(host);

		startHack(ns, host, target);
	});
};

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
