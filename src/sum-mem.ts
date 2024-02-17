import { NS } from "@ns";
import { walk } from "lib/net-walker";

export const main = async (ns: NS) => {
  const home = ns.getHostname();
  const thres = 2;

  let all = 0;
  let avail = 0;

  await walk(ns, (host) => {
    if (host === home) {
      return;
    }

    const mem = ns.getServerMaxRam(host);

    all += mem;
    if (ns.getServerNumPortsRequired(host) <= thres) {
      avail += mem;
    }
  });

  ns.tprint(`all: ${all}, avail: ${avail}`);
};
