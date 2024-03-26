import { NS } from "@ns";

export const canHack = (ns: NS, host: string) =>
	ns.getServerRequiredHackingLevel(host) <= ns.getHackingLevel();
