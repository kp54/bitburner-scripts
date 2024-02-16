/** @param {NS} ns */
export const main = async (ns) => {
  if (ns.args.length !== 1) {
    ns.tprint('usage: weaken TARGET');
    return;
  }

  const target = String(ns.args[0]);
  // disable host verification for `<= 2GB` ram usage
  // if (!ns.serverExists(target)) {
  //   ns.tprint('usage: weaken TARGET');
  //   return;
  // }

  const securityThreshold = ns.getServerMinSecurityLevel(target);

  while (securityThreshold < ns.getServerSecurityLevel(target)) {
    await ns.weaken(target);
  }
};
