import { NS } from "@ns";

export const main = async (ns: NS) => {
  if (ns.args.length !== 1) {
    ns.tprint("usage: pkill FILE");
    return;
  }

  const script = String(ns.args[0]);

  const procs = ns.ps();
  for (const proc of procs) {
    if (proc.filename === script) {
      ns.kill(proc.pid);
    }
  }
};
