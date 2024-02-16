import { NS } from "@ns";

export const canHack = (ns: NS, host: string) =>
  ns.getServerRequiredHackingLevel(host) <= ns.getHackingLevel();

export const openNuke = (ns: NS, host: string) => {
  if (ns.hasRootAccess(host)) {
    return true;
  }

  let openPorts = 0;
  if (ns.fileExists("BruteSSH.exe")) {
    ns.brutessh(host);
    openPorts += 1;
  }
  if (ns.fileExists("FTPCrack.exe")) {
    ns.ftpcrack(host);
    openPorts += 1;
  }
  if (ns.fileExists("relaySMTP.exe")) {
    ns.relaysmtp(host);
    openPorts += 1;
  }
  if (ns.fileExists("HTTPWorm.exe")) {
    ns.httpworm(host);
    openPorts += 1;
  }
  if (ns.fileExists("SQLInject.exe")) {
    ns.sqlinject(host);
    openPorts += 1;
  }

  if (openPorts < ns.getServerNumPortsRequired(host)) {
    return false;
  }

  ns.nuke(host);

  return true;
};
