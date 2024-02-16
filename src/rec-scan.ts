import { NS } from "@ns";
import { walk } from "lib/net-walker";

export const main = async (ns: NS) => {
  const results = new Set<string>();

  await walk(ns, (ns, host, path) => {
    if (!host.startsWith("pserv-") && 0 < path.length) {
      const prev = path.slice(-1)[0];
      results.add(`"${prev}" -> "${host}";`);
    }
  });

  ns.tprint(`\ndigraph G {\n${Array.from(results).join("\n")}\n}\n`);
};
