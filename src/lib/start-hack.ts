import { NS } from "@ns";
import { Port } from "/lib/ports";

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

	if (host !== ns.getHostname()) {
		for (const src of sources) {
			ns.scp(src, host);
		}
	}

	const capacity = Math.floor(ram / ns.getScriptRam(script, host));
	if (0 < capacity) {
		ns.exec(script, host, { threads: capacity }, target);
	}
};
