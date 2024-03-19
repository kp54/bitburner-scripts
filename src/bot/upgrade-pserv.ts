import { NS } from "@ns";
import { startHack } from "/lib/hack-kit";

export const upgradePserv = (ns: NS, target: string) => {
	if (!ns.serverExists("pserv-0")) {
		return;
	}

	const currentRam = ns.getServerMaxRam("pserv-0");
	if (currentRam === ns.getPurchasedServerMaxRam()) {
		return;
	}

	const serverLimit = ns.getPurchasedServerLimit();
	const cost =
		ns.getPurchasedServerUpgradeCost("pserv-0", currentRam * 2) * serverLimit;
	const available = ns.getServerMoneyAvailable("home");
	if (available < cost) {
		return;
	}

	for (let i = 0; i < serverLimit; i++) {
		ns.upgradePurchasedServer(`pserv-${i}`, currentRam * 2);
		ns.killall(`pserv-${i}`);
		startHack(ns, `pserv-${i}`, target);
	}
};
