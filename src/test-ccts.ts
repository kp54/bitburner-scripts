import { NS } from "@ns";
import { solvers } from "./cct/index";

export const main = async (ns: NS) => {
  const host = ns.getHostname();
  const types = ns.codingcontract.getContractTypes();
  for (const type of types) {
    const solver = solvers.get(type);
    if (solver === undefined) {
      continue;
    }

    ns.tprint(`testing implementation for '${type}'...`);

    let failed = false;
    const startAt = Date.now();
    for (let i = 0; i < 16; i++) {
      ns.codingcontract.createDummyContract(type);
      const file = ns
        .ls(host)
        .filter((x) => x.endsWith(".cct"))
        .shift();
      if (file === undefined) {
        throw new Error();
      }

      const input = ns.codingcontract.getData(file, host);
      const output = solver(input);
      const result = ns.codingcontract.attempt(output, file, host);
      if (result === "") {
        failed = true;
        break;
      }

      ns.rm(file, host);
      await ns.asleep(10);
    }

    if (failed) {
      ns.tprint("- failed.");
    } else {
      const elapsed = Date.now() - startAt;
      ns.tprint(`- succeeded in ${elapsed} ms.`);
    }
  }
};
