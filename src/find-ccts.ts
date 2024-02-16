import { NS } from "@ns";
import { walk } from "lib/net-walker";

const logs = [""];

const work = (ns: NS, host: string, path: string[]) => {
  if (host === ns.getHostname()) {
    return;
  }

  const cwd = [...path, host].join("/");
  const ccts = ns.ls(host).filter((x) => x.endsWith(".cct"));

  for (const cct of ccts) {
    const line = `${cwd}: ${cct}`;
    logs.push(line);
  }
};

export const main = async (ns: NS) => {
  await walk(ns, work);
  ns.tprint(logs.join("\n"));
};
