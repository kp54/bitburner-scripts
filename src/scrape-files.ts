import { NS } from "@ns";
import { walk } from "lib/net-walker";

const scrape = async (ns: NS, host: string) => {
  if (host === ns.getHostname()) {
    return;
  }

  const files = ns.ls(host).filter((x) => x.endsWith(".lit"));
  ns.scp(files, "home", host);
};

export const main = async (ns: NS) => {
  await walk(ns, scrape);
};
