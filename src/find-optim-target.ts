import { NS } from "@ns";
import { canHack, openNuke } from "lib/hack-kit";
import { walk } from "lib/net-walker";

export const main = async (ns: NS) => {
  let current_max = 0;
  let current_host = "(none)";

  const work = async (ns: NS, host: string) => {
    if (!canHack(ns, host) || !openNuke(ns, host)) {
      return;
    }

    // from beginners guide:
    // As a rule of thumb, your hacking target should be the Server
    // with highest max money that's required hacking level is
    // under 1/2 of your hacking level.
    if (ns.getHackingLevel() / 2 < ns.getServerRequiredHackingLevel(host)) {
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
