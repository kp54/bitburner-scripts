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

export const startHack = (
  ns: NS,
  host: string,
  targets: string[],
  ram: number = ns.getServerMaxRam(host),
) => {
  const script = "lib/_hack.js";
  ns.scp(script, host);

  const capacity = Math.floor(ram / ns.getScriptRam(script, host));
  const div = Math.floor(capacity / targets.length);
  let mod = capacity % targets.length;

  for (const target of targets) {
    let threads = div;
    if (0 < mod) {
      threads += 1;
      mod -= 1;
    }

    if (threads === 0) {
      break;
    }

    ns.exec(script, host, { threads }, target);
  }
};
