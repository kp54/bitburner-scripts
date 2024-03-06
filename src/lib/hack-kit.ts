import { NS } from "@ns";
import { Port } from "lib/ports";

export const canHack = (ns: NS, host: string) =>
	ns.getServerRequiredHackingLevel(host) <= ns.getHackingLevel();

export const openNuke = (ns: NS, host: string) => {
	if (ns.hasRootAccess(host)) {
		return true;
	}

	let openPorts = 0;
	if (ns.fileExists("BruteSSH.exe")) {
		ns.brutessh(host);
		openPorts += 1;
	}
	if (ns.fileExists("FTPCrack.exe")) {
		ns.ftpcrack(host);
		openPorts += 1;
	}
	if (ns.fileExists("relaySMTP.exe")) {
		ns.relaysmtp(host);
		openPorts += 1;
	}
	if (ns.fileExists("HTTPWorm.exe")) {
		ns.httpworm(host);
		openPorts += 1;
	}
	if (ns.fileExists("SQLInject.exe")) {
		ns.sqlinject(host);
		openPorts += 1;
	}

	if (openPorts < ns.getServerNumPortsRequired(host)) {
		return false;
	}

	ns.nuke(host);

	return true;
};

export const startHack = (
	ns: NS,
	host: string,
	target: string,
	ram: number = ns.getServerMaxRam(host),
) => {
	const script = "lib/_hack.js";
	const sources = ["lib/_hack.js", "lib/ports.js"];

	const current = ns.ps(host).find((x) => x.filename === script);
	if (current !== undefined) {
		ns.tryWritePort(Port.Hack, target);
		return;
	}

	for (const src of sources) {
		ns.scp(src, host);
	}

	const capacity = Math.floor(ram / ns.getScriptRam(script, host));
	if (0 < capacity) {
		ns.exec(script, host, { threads: capacity }, target);
	}
};

export const showMissing = (ns: NS, targets: string[]) => {
	const missing = targets.filter((x) => !ns.serverExists(x));
	if (0 < missing.length) {
		for (const target of missing) {
			ns.tprint(`${target}: no such host.`);
		}
		return true;
	}

	return false;
};
