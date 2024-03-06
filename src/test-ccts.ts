import { NS } from "@ns";
import { solvers } from "./cct/index";

const test = async (ns: NS, host: string, type: string) => {
  const solver = solvers.get(type);
  if (solver === undefined) {
    return true;
  }

  ns.tprint(`testing implementation for '${type}'...`);

  const startAt = Date.now();
  for (let i = 0; i < 128; i++) {
    const file = ns.codingcontract.createDummyContract(type);
    const input = ns.codingcontract.getData(file, host);
    const output = solver(input);
    const result = ns.codingcontract.attempt(output, file, host);
    if (result === "") {
      ns.tprint("- failed.");
      return false;
    }

    ns.rm(file, host);
    await ns.asleep(10);
  }

  const elapsed = Date.now() - startAt;
  ns.tprint(`- succeeded in ${elapsed} ms.`);
  return true;
};

export const main = async (ns: NS) => {
  if (1 < ns.args.length) {
    ns.tprint("usage: test-ccts [TYPE]");
    return;
  }

  let type: string | null = null;
  if (ns.args.length === 1) {
    type = String(ns.args[0]);
  }

  const host = ns.getHostname();

  for (const file of ns.ls(host)) {
    if (file.endsWith(".cct")) {
      ns.rm(file);
    }
  }

  if (type !== null) {
    await test(ns, host, type);
  } else {
    const types = ns.codingcontract.getContractTypes();
    for (const type of types) {
      await test(ns, host, type);
    }
  }
};
