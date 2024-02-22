import { NS } from "@ns";
import { findOptimTargets } from "./find-optim-target";

export const main = async (ns: NS) => {
  const targetAmp = 1.5;

  const autoDeployJs = "auto-deploy.js";
  const fillJs = "fill.js";

  const host = ns.getHostname();

  const state = {
    target: {
      name: "n00dles",
      score: 0,
    },
  };

  while (true) {
    const target = (await findOptimTargets(ns, 1)).shift();

    if (target !== undefined && state.target.score * targetAmp < target.score) {
      ns.killall(host, true);
      ns.exec(autoDeployJs, host, {}, target.host);
      ns.exec(fillJs, host, {}, target.host);

      state.target.name = target.host;
      state.target.score = target.score;
    }

    await ns.asleep(60000);
  }
};
