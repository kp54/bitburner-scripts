import { NS } from "@ns";
import { solvers } from "./cct/index";
import { walk } from "./lib/net-walker";

export const main = async (ns: NS) => {
  await walk(ns, (host) => {
    const ccts = ns.ls(host).filter((x) => x.endsWith(".cct"));

    for (const file of ccts) {
      const log = (line: string) => ns.tprint(`${host}: ${file}: ${line}`);

      const type = ns.codingcontract.getContractType(file, host);
      const solver = solvers.get(type);

      if (solver === undefined) {
        log(`solver not implemented for '${type}'`);
        return;
      }

      const input = ns.codingcontract.getData(file, host);
      const output = solver(input);

      const result = ns.codingcontract.attempt(output, file, host);
      if (result === "") {
        log("failed");
      } else {
        log(`succeeded: ${result}`);
      }
    }
  });
};
