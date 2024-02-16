import { walk } from "lib/net-walker";

/**
 * @param {NS} ns
 * @param {string} host
 */
const scrape = async (ns, host) => {
  if (host === ns.getHostname()) {
    return;
  }

  const files = ns.ls(host).filter((x) => x.endsWith(".lit"));
  ns.scp(files, "home", host);
};

/** @param {NS} ns */
export const main = async (ns) => {
  await walk(ns, scrape);
};
