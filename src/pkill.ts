import { NS } from "@ns";

export const main = (ns: NS) => {
  if (ns.args.length !== 1) {
    ns.tprint("usage: pkill FILE");
    return;
  }

  const match = String(ns.args[0]);

  const procs = ns.ps();
  for (const proc of procs) {
    const cmdline = `${proc.filename} ${proc.args.join(" ")}`;
    if (cmdline.includes(match)) {
      ns.kill(proc.pid);
    }
  }
};
