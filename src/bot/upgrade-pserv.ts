import { NS } from "@ns";
import { calcSetupCost } from "/bot/calc-setup-cost";
import { startHack } from "/lib/hack-kit";
import { pserv } from "/lib/pserv-i";

const pserv0 = pserv(0);

export const upgradePserv = (ns: NS, target: string) => {
	if (!ns.serverExists(pserv0)) {
		return;
	}

	const currentRam = ns.getServerMaxRam(pserv0);
	if (currentRam === ns.getPurchasedServerMaxRam()) {
		return;
	}

	const reserved = calcSetupCost(ns);
	const serverLimit = ns.getPurchasedServerLimit();
	const serverCost =
		ns.getPurchasedServerUpgradeCost(pserv0, currentRam * 2) * serverLimit;
	const available = ns.getServerMoneyAvailable("home");
	if (available - reserved < serverCost) {
		return;
	}

	for (let i = 0; i < serverLimit; i++) {
		ns.upgradePurchasedServer(pserv(i), currentRam * 2);
		ns.killall(pserv(i));
		startHack(ns, pserv(i), target);
	}
};
