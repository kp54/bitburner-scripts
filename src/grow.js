/** @param {NS} ns */
export const main = async (ns) => {
  if (ns.args.length !== 1) {
    ns.tprint('usage: grow TARGET');
    return;
  }

  const target = String(ns.args[0]);
  const moneyThreshold = ns.getServerMaxMoney(target);

  while (moneyThreshold < ns.getServerMoneyAvailable(target)) {
    await ns.grow(target);
  }
};
