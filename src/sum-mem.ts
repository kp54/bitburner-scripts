import { NS } from "@ns";
import { walk } from "lib/net-walker";

export const main = async (ns: NS) => {
  const home = ns.getHostname();
  const thres = 2;

  let all = 0;
  let avail = 0;

  const work = (ns: NS, host: string) => {
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
