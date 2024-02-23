import { NS } from "@ns";
import { solvers } from "./cct/index";

export const main = async (ns: NS) => {
  const host = ns.getHostname();

  for (const file of ns.ls(host)) {
    if (file.endsWith(".cct")) {
      ns.rm(file);
    }
  }

  const types = ns.codingcontract.getContractTypes();
  for (const type of types) {
    const solver = solvers.get(type);
    if (solver === undefined) {
      continue;
    }

    ns.tprint(`testing implementation for '${type}'...`);

    const startAt = Date.now();
    for (let i = 0; i < 128; i++) {
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
        ns.tprint("- failed.");
        return;
      }

      ns.rm(file, host);
      await ns.asleep(10);
    }

    const elapsed = Date.now() - startAt;
    ns.tprint(`- succeeded in ${elapsed} ms.`);
  }
};
