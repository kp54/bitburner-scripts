import { openNuke } from "lib/hack-kit";
import { walk } from "lib/net-walker";

/** @param {NS} ns */
const usage = (ns) => {
  ns.tprint("usage: rec-deploy FILE [ARGS...]");
};

/** @param {NS} ns */
export const main = async (ns) => {
  if (ns.args.length < 1) {
    usage(ns);
    return;
  }

  const script = String(ns.args[0]);
  const args = ns.args.slice(1);

  if (!ns.fileExists(script)) {
    usage(ns);
    return;
  }

  /**
   * @param {NS} ns
   * @param {string} host
   */
  const deploy = (ns, host) => {
    ns.killall(host);
    ns.scp(script, host);

    const capacity = Math.floor(
      ns.getServerMaxRam(host) / ns.getScriptRam(script, host),
    );
    if (capacity === 0) {
      return;
    }

    ns.exec(script, host, { threads: capacity }, ...args);
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

  await walk(ns, work);
};
