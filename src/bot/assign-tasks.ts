import { NS } from "@ns";
import { GangTasks } from "/const/gang-tasks";

const trainThres = 100;

const tasks = [
	GangTasks.Ransomware,
	GangTasks.Phishing,
	GangTasks.IdentityTheft,
	GangTasks.DDoSAttacks,
	GangTasks.PlantVirus,
	GangTasks.FraudAndCounterfeiting,
	GangTasks.MoneyLaundering,
	GangTasks.Cyberterrorism,
];

export const assignTasks = async (ns: NS) => {
	if (!ns.gang.inGang()) {
		return;
	}

	const members = ns.gang.getMemberNames();
	for (const member of members) {
		const mem = ns.gang.getMemberInformation(member);
		if (mem.hack < trainThres) {
			ns.gang.setMemberTask(member, GangTasks.TrainHacking);
			continue;
		}

		let prevTask: string = GangTasks.EthicalHacking;
		for (const task of tasks) {
			ns.gang.setMemberTask(member, task);

			await ns.gang.nextUpdate();
			const info = ns.gang.getGangInformation();
			if (0 < info.wantedLevelGainRate) {
				ns.gang.setMemberTask(member, prevTask);
				break;
			}

			prevTask = task;
		}
	}
};
