import { NS } from "@ns";
import { walk } from "lib/net-walker";

export const main = async (ns: NS) => {
  const logs = [""];

  await walk(ns, (host) => {
    if (host === ns.getHostname()) {
      return;
    }

    const ccts = ns.ls(host).filter((x) => x.endsWith(".cct"));

    for (const cct of ccts) {
      const type = ns.codingcontract.getContractType(cct, host);
      const line = `${host}: ${cct} ${type}`;
      logs.push(line);
    }
  });

  ns.tprint(logs.join("\n"));
};
