import { NS } from "@ns";
import { startHack } from "./lib/hack-kit";

export const main = (ns: NS) => {
  if (ns.args.length < 1) {
    ns.tprint("usage: fill TARGET...");
    return;
  }

  const targets = ns.args.map((x) => String(x));
  const host = ns.getHostname();

  const reserve = 12;
  const used = ns.getServerUsedRam(host);
  const available = ns.getServerMaxRam(host) - used - reserve;

  startHack(ns, host, targets, available);
};