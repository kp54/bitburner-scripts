import { NS } from "@ns";
import { walk } from "lib/net-walker";

const logs = new Array("<deep-ls>");

const list = (ns: NS, host: string, path: string[]) => {
  if (host === ns.getHostname()) {
    return;
  }

  const cwd = [...path, host].join("/");

  const lines = [`${cwd}:`];
  lines.push(...ns.ls(host).map((x) => `- ${x}`));

  if (lines.length === 1) {
    lines.push("- <empty>");
  }

  lines.push("");
  logs.push(...lines);
};

export const main = async (ns: NS) => {
  await walk(ns, list);
  ns.tprint(logs.join("\n"));
};
