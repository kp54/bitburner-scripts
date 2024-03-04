import { NS } from "@ns";
import { showMissing, startHack } from "./lib/hack-kit";

export const fill = (ns: NS, target: string) => {
  const host = ns.getHostname();

  const max = ns.getServerMaxRam(host);
  const reserve = Math.min(24, Math.floor(max * 0.25));
  const used = ns.getServerUsedRam(host);
  const available = max - used - reserve;

  startHack(ns, host, target, available);
};

export const main = (ns: NS) => {
  if (ns.args.length !== 1) {
    ns.tprint("usage: fill TARGET");
    return;
  }

  const target = String(ns.args[0]);
  if (showMissing(ns, [target])) {
    return;
  }

  fill(ns, target);
};
