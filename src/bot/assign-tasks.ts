import { NS } from "@ns";
import { GangTasks } from "/const/gang-tasks";

const trainThres = 100;

export const assignTasks = async (ns: NS) => {
	const members = ns.gang.getMemberNames();
	for (const member of members) {
		const mem = ns.gang.getMemberInformation(member);
		if (mem.hack < trainThres) {
			ns.gang.setMemberTask(member, GangTasks.TrainHacking);
			await ns.gang.nextUpdate();
			continue;
		}

		ns.gang.setMemberTask(member, GangTasks.IdentityTheft);
		await ns.gang.nextUpdate();

		const info = ns.gang.getGangInformation();
		if (0 < info.wantedLevelGainRate) {
			ns.gang.setMemberTask(member, GangTasks.EthicalHacking);
			await ns.gang.nextUpdate();
		}
	}
};
