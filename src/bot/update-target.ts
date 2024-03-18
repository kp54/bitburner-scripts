import { NS } from "@ns";
import { autoDeploy } from "/lib/auto-deploy";
import { findOptimTargets } from "/lib/find-optim-targets";
import { useHome } from "/lib/use-home";

export type Target = {
	name: string;
	score: number;
};

export const initialTarget = (): Target => ({
	name: "n00dles",
	score: 0,
});

export const updateTarget = async (ns: NS, target: Target): Promise<Target> => {
	const optim = (await findOptimTargets(ns, 1)).shift();

	if (optim === undefined || optim.score <= target.score) {
		return target;
	}

	await autoDeploy(ns, optim.host);
	useHome(ns, optim.host);

	const newTarget: Target = {
		name: optim.host,
		score: optim.score,
	};

	return newTarget;
};
