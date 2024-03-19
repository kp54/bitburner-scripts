import { NS } from "@ns";
import { walk } from "/lib/net-walker";

export const main = async (ns: NS) => {
	await walk(ns, (host) => {
		ns.killall(host, true);
		const scripts = ns.ls(host).filter((x) => x.endsWith(".js"));
		for (const script of scripts) {
			ns.rm(script, host);
		}
	});
};
