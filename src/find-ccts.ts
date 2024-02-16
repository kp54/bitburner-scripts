import { NS } from "@ns";
import { walk } from "lib/net-walker";

export const main = async (ns: NS) => {
  const logs = [""];

  await walk(ns, (ns, host, path) => {
    if (host === ns.getHostname()) {
      return;
    }

    const cwd = [...path, host].join("/");
    const ccts = ns.ls(host).filter((x) => x.endsWith(".cct"));

    for (const cct of ccts) {
      const line = `${cwd}: ${cct}`;
      logs.push(line);
    }
  });

  ns.tprint(logs.join("\n"));
};
