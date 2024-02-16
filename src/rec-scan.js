import { walk } from "lib/net-walker";

/** @type {Set<string>} */
const results = new Set();

/**
 * @param {NS} ns
 * @param {string} host
 * @param {string[]} path
 */
const work = async (ns, host, path) => {
  if (!host.startsWith("pserv-") && 0 < path.length) {
    const prev = path.slice(-1)[0];
    results.add(`"${prev}" -> "${host}";`);
  }
};

/** @param {NS} ns */
export const main = async (ns) => {
  await walk(ns, work);
  ns.tprint(`\ndigraph G {\n${Array.from(results).join("\n")}\n}\n`);
};
