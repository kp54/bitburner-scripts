import { NS } from "@ns";
import { addPserv } from "/bot/add-pserv";
import { assignTasks } from "/bot/assign-tasks";
import { recruitAndAscend } from "/bot/recruit-and-ascend";
import { solveCcts } from "/bot/solve-ccts";
import { initialTarget, updateTarget } from "/bot/update-target";
import { upgradePserv } from "/bot/upgrade-pserv";

export const main = async (ns: NS) => {
	const state = {
		target: initialTarget(),
	};

	const actions: (() => void | Promise<void>)[] = [
		() => addPserv(ns, state.target.name),
		() => upgradePserv(ns, state.target.name),
		async () => {
			state.target = await updateTarget(ns, state.target);
		},
		() => recruitAndAscend(ns),
		async () => await assignTasks(ns),
		async () => await solveCcts(ns),
	];

	while (true) {
		for (const action of actions) {
			await action();
			await ns.asleep(10 * 1000);
		}
	}
};
