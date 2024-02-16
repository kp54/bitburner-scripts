import { NS } from "@ns";
import { walk } from "lib/net-walker";

export const main = async (ns: NS) => {
  if (ns.args.length !== 1) {
    ns.tprint("usage: rec-kill FILE");
    return;
  }

  const script = String(ns.args[0]);

  const kill = async (ns: NS, host: string) => {
    const procs = ns.ps(host);
    for (const proc of procs) {
      if (proc.filename === script) {
        ns.kill(proc.pid);
      }
    }
  };

  await walk(ns, kill);
};
