import { NS } from "@ns";
import { addPserv } from "/bot/add-pserv";
import { assignTasks } from "/bot/assign-tasks";
import { recruitAndAscend } from "/bot/recruit-and-ascend";
import { initialTarget, updateTarget } from "/bot/update-target";
import { upgradePserv } from "/bot/upgrade-pserv";

export const main = async (ns: NS) => {
	const state = {
		target: initialTarget(),
	};

	while (true) {
		addPserv(ns, state.target.name);
		upgradePserv(ns, state.target.name);
		state.target = await updateTarget(ns, state.target);
		recruitAndAscend(ns);
		await assignTasks(ns);

		await ns.asleep(60 * 1000);
	}
};
