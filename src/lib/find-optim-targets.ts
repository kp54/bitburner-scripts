import { NS } from "@ns";
import { canHack, openNuke } from "/lib/hack-kit";
import { walk } from "/lib/net-walker";

export const findOptimTargets = async (ns: NS, limit: number) => {
	const hosts = new Array<{ host: string; score: number }>();

	await walk(ns, (host) => {
		if (!canHack(ns, host) || !openNuke(ns, host)) {
			return;
		}

		// from beginners guide:
		// As a rule of thumb, your hacking target should be the Server
		// with highest max money that's required hacking level is
		// under 1/2 of your hacking level.
		const levelThreshold = Math.max(ns.getHackingLevel() / 2, 1);
		if (levelThreshold < ns.getServerRequiredHackingLevel(host)) {
			return;
		}

		const score = ns.getServerMaxMoney(host);
		hosts.push({ host, score });
	});

	hosts.sort((x, y) => y.score - x.score);
	if (limit !== -1) {
		hosts.splice(limit);
	}

	return hosts;
};
