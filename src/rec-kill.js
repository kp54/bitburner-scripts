import { walk } from "lib/net-walker";

/** @param {NS} ns */
export const main = async (ns) => {
  if (ns.args.length !== 1) {
    ns.tprint('usage: rec-kill FILE');
    return;
  }

  const script = String(ns.args[0]);

  /**
   * @param {NS} ns
   * @param {string} host
   */
  const kill = async (ns, host) => {
    const procs = ns.ps(host);
    for (const proc of procs) {
      if (proc.filename === script) {
        ns.kill(proc.pid);
      }
    }
  };

  await walk(ns, kill);
};
