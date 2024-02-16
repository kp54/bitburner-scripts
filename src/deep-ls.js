import { walk } from "lib/net-walker";

const logs = new Array("<deep-ls>");

/**
 * @param {NS} ns
 * @param {string} host
 * @param {string[]} path
 */
const list = async (ns, host, path) => {
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
};

/** @param {NS} ns */
export const main = async (ns) => {
  await walk(ns, list);
  ns.tprint(logs.join("\n"));
};
