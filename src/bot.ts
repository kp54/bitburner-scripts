import { NS } from "@ns";
import { autoDeploy } from "auto-deploy";
import { fill } from "fill";
import { findOptimTargets } from "find-optim-target";

export const main = async (ns: NS) => {
  const state = {
    target: {
      name: "n00dles",
      score: 0,
    },
  };

  while (true) {
    const target = (await findOptimTargets(ns, 1)).shift();

    if (target !== undefined && state.target.score < target.score) {
      await autoDeploy(ns, target.host);
      fill(ns, target.host);

      state.target.name = target.host;
      state.target.score = target.score;
    }

    await ns.asleep(60 * 1000);
  }
};
