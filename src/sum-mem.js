import { walk } from "lib/net-walker";

/** @param {NS} ns */
export const main = async (ns) => {
  const home = ns.getHostname();
  const thres = 2;

  let all = 0;
  let avail = 0;

  /**
   * @param {NS} ns
   * @param {string} host
   */
  const work = (ns, host) => {
    if (host === home) {
      return;
    }

    const mem = ns.getServerMaxRam(host);

    all += mem;
    if (ns.getServerNumPortsRequired(host) <= thres) {
      avail += mem;
    }
  };

  await walk(ns, work);

  ns.tprint(`all: ${all}, avail: ${avail}`);
};
