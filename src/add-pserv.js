/** @param {NS} ns */
export const main = async (ns) => {
  if (ns.args.length !== 1) {
    ns.tprint("usage: add-pserv TARGET");
    return;
  }

  const script = "hack.js";
  const target = String(ns.args[0]);
  const memSize = 32;

  let numServers = ns.getPurchasedServers().length;

  while (numServers < ns.getPurchasedServerLimit()) {
    if (
      ns.getPurchasedServerCost(memSize) < ns.getServerMoneyAvailable("home")
    ) {
      const host = ns.purchaseServer(`pserv-${numServers}`, memSize);

      ns.scp(script, host);
      const threads = Math.floor(
        ns.getServerMaxRam(host) / ns.getScriptRam(script, host),
      );
      ns.exec(script, host, { threads }, target);

      numServers += 1;
    }

    await ns.asleep(1000);
  }
};
