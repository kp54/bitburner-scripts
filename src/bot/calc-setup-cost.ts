import { NS } from "@ns";

export const calcSetupCost = (ns: NS) => {
	const k = 10 ** 3;
	const m = 10 ** 6;
	const b = 10 ** 9;

	const programs = [
		["BruteSSH.exe", 500.0 * k],
		["FTPCrack.exe", 1.5 * m],
		["relaySMTP.exe", 5.0 * m],
		["HTTPWorm.exe", 30.0 * m],
		["SQLInject.exe", 250.0 * m],
		["ServerProfiler.exe", 500.0 * k],
		["DeepscanV1.exe", 500.0 * k],
		["DeepscanV2.exe", 25.0 * m],
		["AutoLink.exe", 1.0 * m],
		// ["Formulas.exe", 5.0 * b],
	] as const;

	let total = 0;
	for (const [prog, cost] of programs) {
		if (!ns.fileExists(prog)) {
			total += cost;
		}
	}

	return total;
};
