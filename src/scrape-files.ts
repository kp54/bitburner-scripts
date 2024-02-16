import { NS } from "@ns";
import { walk } from "lib/net-walker";

export const main = async (ns: NS) => {
  await walk(ns, (ns, host) => {
    if (host === ns.getHostname()) {
      return;
    }

    const files = ns.ls(host).filter((x) => x.endsWith(".lit"));
    ns.scp(files, "home", host);
  });
};
