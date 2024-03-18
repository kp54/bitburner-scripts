import { NS } from "@ns";
import { walk } from "/lib/net-walker";

export const main = async (ns: NS) => {
	const logs = new Array("<deep-ls>");

	await walk(ns, (host, path) => {
		if (host === ns.getHostname()) {
			return;
		}

		const cwd = [...path, host].join("/");

		const lines = [`${cwd}:`];
		lines.push(...ns.ls(host).map((x) => `- ${x}`));

		if (lines.length === 1) {
			lines.push("- <empty>");
		}

		lines.push("");
		logs.push(...lines);
	});

	ns.tprint(logs.join("\n"));
};
