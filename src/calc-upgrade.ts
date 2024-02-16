import { NS } from "@ns";

export const main = (ns: NS) => {
  if (ns.args.length !== 2) {
    ns.tprint("usage: calc-upgrade SERVER SIZE");
    return;
  }

  const server = String(ns.args[0]);
  const memSize = Number(ns.args[1]);

  const current = ns.getServerMaxRam(server);
  const max = ns.getPurchasedServerMaxRam();
  const cost = ns.getPurchasedServerUpgradeCost(server, memSize);
  ns.tprint(
    `${server}: ${ns.formatNumber(cost)} (${ns.formatRam(
      current,
    )} -> ${ns.formatRam(memSize)} / ${ns.formatRam(max)})`,
  );
};
