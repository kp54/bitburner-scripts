import { NS } from "@ns";
import { walk } from "lib/net-walker";

const config = `
graph [
  bgcolor = "#222222"
]

edge [
  color = "#aaaaaa"
]

node [
  color = white
  fontcolor = white
]
`;

export const main = async (ns: NS) => {
	const results = new Set<string>();

	await walk(ns, (host, path) => {
		if (!host.startsWith("pserv-") && 0 < path.length) {
			const prev = path.slice(-1)[0];
			results.add(`"${prev}" -> "${host}";`);
		}
	});

	const lines = ["", "digraph G {", config, ...Array.from(results), "}"];

	ns.tprint(lines.join("\n"));
};
