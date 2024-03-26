import { NS } from "@ns";

export const showMissingHosts = (ns: NS, targets: string[]) => {
	const missing = targets.filter((x) => !ns.serverExists(x));
	if (0 < missing.length) {
		for (const target of missing) {
			ns.tprint(`${target}: no such host.`);
		}
		return true;
	}

	return false;
};
