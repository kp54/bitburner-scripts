import { NS } from "@ns";
import { walk } from "lib/net-walker";

const results = new Set<string>();

const work = (ns: NS, host: string, path: string[]) => {
  if (!host.startsWith("pserv-") && 0 < path.length) {
    const prev = path.slice(-1)[0];
    results.add(`"${prev}" -> "${host}";`);
  }
};

export const main = async (ns: NS) => {
  await walk(ns, work);
  ns.tprint(`\ndigraph G {\n${Array.from(results).join("\n")}\n}\n`);
};
