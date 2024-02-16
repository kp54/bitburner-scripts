import { NS } from "@ns";
import { openNuke } from "lib/hack-kit";
import { walk } from "lib/net-walker";

export const main = async (ns: NS) => {
  if (ns.args.length !== 1) {
    ns.tprint("usage: auto-deploy TARGET");
    return;
  }

  const script = "hack.js";
  const target = String(ns.args[0]);

  const knownHosts = new Set<string>();

  const deploy = (ns: NS, host: string) => {
    if (knownHosts.has(host)) {
      return;
    }
    knownHosts.add(host);

    ns.killall(host);

    ns.scp(script, host);
    const capacity = Math.floor(
      ns.getServerMaxRam(host) / ns.getScriptRam(script, host),
    );

    if (capacity === 0) {
      return;
    }

    ns.exec(script, host, { threads: capacity }, target);
  };

  const work = async (ns: NS, host: string) => {
    if (host === ns.getHostname()) {
      return;
    }

    if (!openNuke(ns, host)) {
      return;
    }

    deploy(ns, host);
  };

  while (true) {
    await walk(ns, work);
    await ns.asleep(60 * 1000);
  }
};
