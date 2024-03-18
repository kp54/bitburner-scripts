import { NS } from "@ns";
import { Port } from "/lib/ports";

export const main = async (ns: NS) => {
	if (ns.args.length !== 1) {
		ns.tprint("usage: hack TARGET");
		return;
	}

	let target = String(ns.args[0]);
	let securityThreshold = ns.getServerMinSecurityLevel(target);
	let moneyThreshold = ns.getServerMaxMoney(target);

	const port = ns.getPortHandle(Port.Hack);

	while (true) {
		if (!port.empty()) {
			const nextTarget = String(port.read());
			await ns.hack(target);

			target = nextTarget;
			securityThreshold = ns.getServerMinSecurityLevel(target);
			moneyThreshold = ns.getServerMaxMoney(target);
			continue;
		}

		if (securityThreshold < ns.getServerSecurityLevel(target)) {
			await ns.weaken(target);
			continue;
		}

		if (ns.getServerMoneyAvailable(target) < moneyThreshold) {
			await ns.grow(target);
			continue;
		}

		await ns.hack(target);
	}
};
