/**
 * @param {NS} ns
 * @param {string} host
 */
export const canHack = (ns, host) =>
  ns.getServerRequiredHackingLevel(host) <= ns.getHackingLevel();

/**
 * @param {NS} ns
 * @param {string} host
 */
export const openNuke = (ns, host) => {
  if (ns.hasRootAccess(host)) {
    return true;
  }

  let openPorts = 0;
  if (ns.fileExists('BruteSSH.exe')) {
    ns.brutessh(host);
    openPorts += 1;
  }
  if (ns.fileExists('FTPCrack.exe')) {
    ns.ftpcrack(host);
    openPorts += 1;
  }
  if (ns.fileExists('relaySMTP.exe')) {
    ns.relaysmtp(host);
    openPorts += 1;
  }
  if (ns.fileExists('HTTPWorm.exe')) {
    ns.httpworm(host);
    openPorts += 1;
  }
  if (ns.fileExists('SQLInject.exe')) {
    ns.sqlinject(host);
    openPorts += 1;
  }

  if (openPorts < ns.getServerNumPortsRequired(host)) {
    return false;
  }

  ns.nuke(host);

  return true;
};
