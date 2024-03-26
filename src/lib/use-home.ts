import { NS } from "@ns";
import { startHack } from "/lib/start-hack";

export const useHome = (ns: NS, target: string) => {
	const host = ns.getHostname();

	const max = ns.getServerMaxRam(host);
	const reserve = Math.min(24, Math.floor(max * 0.25));
	const used = ns.getServerUsedRam(host);
	const available = max - used - reserve;

	startHack(ns, host, target, available);
};
