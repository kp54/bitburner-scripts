import { NS } from "@ns";
import { showMissing, startHack } from "./lib/hack-kit";

export const main = async (ns: NS) => {
  if (ns.args.length < 2) {
    ns.tprint("usage: upgrade-pserv SIZE TARGET...");
    return;
  }

  const memSize = Number(ns.args[0]);
  const targets = ns.args.slice(1).map((x) => String(x));

  if (showMissing(ns, targets)) {
    return;
  }

  const servers = ns.getPurchasedServers();

  for (const server of servers) {
    if (memSize <= ns.getServerMaxRam(server)) {
      continue;
    }

    while (
      ns.getServerMoneyAvailable("home") <
      ns.getPurchasedServerUpgradeCost(server, memSize)
    ) {
      await ns.asleep(1000);
    }

    ns.upgradePurchasedServer(server, memSize);

    ns.killall(server);
    startHack(ns, server, targets);
  }
};
