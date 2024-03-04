import { NS } from "@ns";
import { showMissing, startHack } from "./lib/hack-kit";

export const main = async (ns: NS) => {
  if (ns.args.length !== 2) {
    ns.tprint("usage: upgrade-pserv SIZE TARGET");
    return;
  }

  const memSize = Number(ns.args[0]);
  const target = String(ns.args[1]);

  if (showMissing(ns, [target])) {
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
    startHack(ns, server, target);
  }
};
