import { NS } from "@ns";
import { calcSetupCost } from "/bot/calc-setup-cost";
import { pserv } from "/lib/pserv-i";
import { startHack } from "/lib/start-hack";

const pserv0 = pserv(0);

const calcUpgradeCost = (ns: NS, ram: number, serverLimit: number) => {
	const reserved = calcSetupCost(ns);
	const weight = 1.5;
	const serverCost =
		ns.getPurchasedServerUpgradeCost(pserv0, ram) * serverLimit;

	return serverCost * weight + reserved;
};

export const upgradePserv = (ns: NS, target: string) => {
	const serverLimit = ns.getPurchasedServerLimit();

	if (!ns.serverExists(pserv0)) {
		return ns.getPurchasedServerCost(8) * serverLimit;
	}

	const currentRam = ns.getServerMaxRam(pserv0);
	if (currentRam === ns.getPurchasedServerMaxRam()) {
		return 0;
	}

	const available = ns.getServerMoneyAvailable("home");
	const required = calcUpgradeCost(ns, currentRam * 2, serverLimit);
	if (available < required) {
		return required;
	}

	for (let i = 0; i < serverLimit; i++) {
		ns.upgradePurchasedServer(pserv(i), currentRam * 2);
		ns.killall(pserv(i));
		startHack(ns, pserv(i), target);
	}

	return calcUpgradeCost(ns, currentRam * 4, serverLimit);
};
