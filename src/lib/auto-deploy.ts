import { NS } from "@ns";
import { openNuke, startHack } from "/lib/hack-kit";
import { walk } from "/lib/net-walker";

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
