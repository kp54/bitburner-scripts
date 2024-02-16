/** @param {NS} ns */
export const main = async (ns) => {
  if (ns.args.length !== 1) {
    ns.tprint('usage: hack TARGET');
    return;
  }

  const target = String(ns.args[0]);
  const securityThreshold = ns.getServerMinSecurityLevel(target);
  const moneyThreshold = ns.getServerMaxMoney(target);

  while (true) {
    if (securityThreshold < ns.getServerSecurityLevel(target)) {
      await ns.weaken(target);
      continue;
    }

    if (ns.getServerMoneyAvailable(target) < moneyThreshold) {
      await ns.grow(target);
      continue;
    }

    await ns.hack(target);
  }
};
