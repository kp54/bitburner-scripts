import { NS } from "@ns";
import { GangTasks } from "/const/gang-tasks";
import { gang } from "/lib/gang-i";

const ascentionThres = 1.2;

export const recruitAndAscend = (ns: NS) => {
	if (!ns.gang.inGang()) {
		return;
	}

	const members = ns.gang.getMemberNames();

	for (let i = 0; i < ns.gang.getRecruitsAvailable(); i++) {
		const name = gang(members.length + i);
		ns.gang.recruitMember(name);
		ns.gang.setMemberTask(name, GangTasks.TrainHacking);
	}

	for (const member of members) {
		const asc = ns.gang.getAscensionResult(member);
		if (asc !== undefined && ascentionThres < asc.hack) {
			ns.gang.ascendMember(member);
			ns.gang.setMemberTask(member, GangTasks.TrainHacking);
		}
	}
};
