import { NS } from "@ns";
import { walk } from "/lib/net-walker";
import { openNuke } from "/lib/open-nuke";
import { startHack } from "/lib/start-hack";

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
