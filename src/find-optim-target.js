import { walk } from "lib/net-walker";
import { canHack, openNuke } from "lib/hack-kit";

/** @param {NS} ns */
export const main = async (ns) => {
  let current_max = 0;
  let current_host = '(none)';

  /**
   * @param {NS} ns
   * @param {string} host
   */
  const work = async (ns, host) => {
    if (!canHack(ns, host) || !openNuke(ns, host)) {
      return;
    }

    // from beginners guide:
    // As a rule of thumb, your hacking target should be the Server
    // with highest max money that's required hacking level is
    // under 1/2 of your hacking level.
    if ((ns.getHackingLevel() / 2) < ns.getServerRequiredHackingLevel(host)) {
      return;
    }

    const maxMon = ns.getServerMaxMoney(host);

    if (current_max < maxMon) {
      current_max = maxMon;
      current_host = host;
    }
  };

  await walk(ns, work);

  ns.tprint(`Host: ${current_host}, MaxMon: ${current_max}`);
};
