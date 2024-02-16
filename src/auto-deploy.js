import { openNuke } from "lib/hack-kit";
import { walk } from "lib/net-walker";

/** @param {NS} ns */
export const main = async (ns) => {
  if (ns.args.length !== 1) {
    ns.tprint("usage: auto-deploy TARGET");
    return;
  }

  const script = "hack.js";
  const target = String(ns.args[0]);

  /** @type {Set<string>} */
  const knownHosts = new Set();

  /**
   * @param {NS} ns
   * @param {string} host
   */
  const deploy = (ns, host) => {
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

  /**
   * @param {NS} ns
   * @param {string} host
   */
  const work = async (ns, host) => {
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
