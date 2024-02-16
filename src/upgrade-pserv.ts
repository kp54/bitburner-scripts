import { NS } from "@ns";

export const main = async (ns: NS) => {
  if (ns.args.length !== 2) {
    ns.tprint("usage: upgrade-pserv SIZE TARGET");
    return;
  }

  const script = "hack.js";
  const memSize = Number(ns.args[0]);
  const target = String(ns.args[1]);

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
    ns.scp(script, server);
    const threads = Math.floor(
      ns.getServerMaxRam(server) / ns.getScriptRam(script, server),
    );
    ns.exec(script, server, { threads }, target);
  }
};
