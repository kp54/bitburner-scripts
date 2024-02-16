import { NS } from "@ns";
import { startHack } from "./lib/hack-kit";

export const main = async (ns: NS) => {
  if (ns.args.length < 1) {
    ns.tprint("usage: add-pserv TARGET...");
    return;
  }

  const targets = ns.args.map((x) => String(x));
  const memSize = 32;

  let numServers = ns.getPurchasedServers().length;

  while (numServers < ns.getPurchasedServerLimit()) {
    if (
      ns.getPurchasedServerCost(memSize) < ns.getServerMoneyAvailable("home")
    ) {
      const host = ns.purchaseServer(`pserv-${numServers}`, memSize);

      startHack(ns, host, targets);

      numServers += 1;
    }

    await ns.asleep(1000);
  }
};
