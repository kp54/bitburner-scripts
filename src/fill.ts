import { NS } from "@ns";

export const main = (ns: NS) => {
  if (ns.args.length < 1) {
    ns.tprint("usage: fill FILE [ARGS...]");
    return;
  }

  const script = String(ns.args[0]);
  const args = ns.args.slice(1);
  const host = ns.getHostname();

  const reserve = 12;
  const used = ns.getServerUsedRam(host);
  const available = ns.getServerMaxRam(host) - used - reserve;

  const capacity = Math.floor(available / ns.getScriptRam(script, host));
  if (capacity === 0) {
    return;
  }

  ns.exec(script, host, { threads: capacity }, ...args);
};
