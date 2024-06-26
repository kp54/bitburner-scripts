import { NS } from "@ns";
import { pserv } from "/lib/pserv-i";
import { startHack } from "/lib/start-hack";

export const addPserv = (ns: NS, target: string) => {
	const serverLimit = ns.getPurchasedServerLimit();
	if (ns.getPurchasedServers().length === serverLimit) {
		return;
	}

	const cost = ns.getPurchasedServerCost(8) * serverLimit;
	const available = ns.getServerMoneyAvailable("home");
	if (available < cost) {
		return;
	}

	for (let i = 0; i < serverLimit; i++) {
		ns.purchaseServer(pserv(i), 8);
		startHack(ns, pserv(i), target);
	}
};
