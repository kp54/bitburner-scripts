import { NS } from "@ns";
import { openNuke, startHack } from "lib/hack-kit";
import { walk } from "lib/net-walker";

export const main = async (ns: NS) => {
  if (ns.args.length < 1) {
    ns.tprint("usage: auto-deploy TARGET...");
    return;
  }

  const targets = ns.args.map((x) => String(x));

  const knownHosts = new Set<string>([ns.getHostname()]);

  while (true) {
    await walk(ns, (_, host) => {
      if (knownHosts.has(host) || !openNuke(ns, host)) {
        return;
      }

      knownHosts.add(host);

      ns.killall(host);
      startHack(ns, host, targets);
    });

    await ns.asleep(60 * 1000);
  }
};
