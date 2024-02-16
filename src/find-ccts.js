import { walk } from "lib/net-walker";

const logs = [""];

/**
 * @param {NS} ns
 * @param {string} host
 * @param {string[]} path
 */
const work = async (ns, host, path) => {
  if (host === ns.getHostname()) {
    return;
  }

  const cwd = [...path, host].join("/");
  const ccts = ns.ls(host).filter((x) => x.endsWith(".cct"));

  for (const cct of ccts) {
    const line = `${cwd}: ${cct}`;
    logs.push(line);
  }
};

/** @param {NS} ns */
export const main = async (ns) => {
  await walk(ns, work);
  ns.tprint(logs.join("\n"));
};
