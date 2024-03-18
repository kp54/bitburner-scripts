import { NS } from "@ns";
import { openNuke } from "/lib/hack-kit";
import { walk } from "/lib/net-walker";

const usage = (ns: NS) => {
	ns.tprint("usage: rec-deploy FILE [ARGS...]");
};

export const main = async (ns: NS) => {
	if (ns.args.length < 1) {
		usage(ns);
		return;
	}

	const script = String(ns.args[0]);
	const args = ns.args.slice(1);

	if (!ns.fileExists(script)) {
		usage(ns);
		return;
	}

	await walk(ns, (host) => {
		if (host === ns.getHostname()) {
			return;
		}

		if (!openNuke(ns, host)) {
			return;
		}

		ns.killall(host);
		ns.scp(script, host);

		const capacity = Math.floor(
			ns.getServerMaxRam(host) / ns.getScriptRam(script, host),
		);
		if (capacity === 0) {
			return;
		}

		ns.exec(script, host, { threads: capacity }, ...args);
	});
};
