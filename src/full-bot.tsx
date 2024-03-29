import { NS } from "@ns";
import { addPserv } from "/bot/add-pserv";
import { assignTasks } from "/bot/assign-tasks";
import { recruitAndAscend } from "/bot/recruit-and-ascend";
import { solveCcts } from "/bot/solve-ccts";
import { initialTarget, updateTarget } from "/bot/update-target";
import { upgradePserv } from "/bot/upgrade-pserv";
import { createModal } from "/lib/modal";
import React from "/lib/react";

type Switches = {
	pserv: boolean;
	hack: boolean;
	gang: boolean;
	cct: boolean;
};

const Controller = (props: {
	nextUpgradeAt: string;
	switches: Switches;
	setSwitches: (value: Switches) => void;
}) => {
	const { nextUpgradeAt, switches, setSwitches } = props;

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "auto auto",
				alignItems: "center",
				gap: "0.5em",
			}}
		>
			<div>next upgrade at</div>
			<div>{nextUpgradeAt}</div>
			<div>pserv</div>
			<input
				type="checkbox"
				checked={switches.pserv}
				onClick={() =>
					setSwitches({
						...switches,
						pserv: !switches.pserv,
					})
				}
			/>
			<div>hack</div>
			<input
				type="checkbox"
				checked={switches.hack}
				onClick={() =>
					setSwitches({
						...switches,
						hack: !switches.hack,
					})
				}
			/>
			<div>gang</div>
			<input
				type="checkbox"
				checked={switches.gang}
				onClick={() =>
					setSwitches({
						...switches,
						gang: !switches.gang,
					})
				}
			/>
			<div>cct</div>
			<input
				type="checkbox"
				checked={switches.cct}
				onClick={() =>
					setSwitches({
						...switches,
						cct: !switches.cct,
					})
				}
			/>
		</div>
	);
};

export const main = async (ns: NS) => {
	const state = {
		switches: {
			pserv: false,
			hack: false,
			gang: false,
			cct: false,
		},
		nextUpgradeCost: 0,
		target: initialTarget(),
	};
	const setSwitches = (switches: Switches) => {
		state.switches = switches;
	};

	const modal = createModal();
	modal.setTitle("bot controls");

	(function render() {
		modal.render(
			<Controller
				nextUpgradeAt={
					state.switches.pserv
						? ns.formatNumber(state.nextUpgradeCost)
						: "<off>"
				}
				switches={state.switches}
				setSwitches={setSwitches}
			/>,
		);
		setTimeout(render, 100);
	})();

	modal.hookExit(ns);

	const actions: [() => boolean, () => void | Promise<void>][] = [
		[
			() => state.switches.pserv,
			() => {
				addPserv(ns, state.target.name);
				state.nextUpgradeCost = upgradePserv(ns, state.target.name);
			},
		],
		[
			() => state.switches.hack,
			async () => {
				state.target = await updateTarget(ns, state.target);
			},
		],
		[
			() => state.switches.gang,
			async () => {
				recruitAndAscend(ns);
				await assignTasks(ns);
			},
		],
		[
			() => state.switches.cct,
			async () => {
				await solveCcts(ns);
			},
		],
	];

	while (true) {
		for (const [cond, action] of actions) {
			if (cond()) {
				await action();
				await ns.asleep(10 * 1000);
			}
		}
		await ns.asleep(10);
	}
};
