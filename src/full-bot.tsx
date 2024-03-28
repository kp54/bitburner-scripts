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

const Controller = ({
	setSwitches,
}: { setSwitches: (value: Switches) => void }) => {
	const [state, setState] = React.useState({
		pserv: false,
		hack: false,
		gang: false,
		cct: false,
	});

	return (
		<div
			style={{
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				alignItems: "center",
				gap: "0.5em",
			}}
		>
			<div>pserv</div>
			<input
				type="checkbox"
				checked={state.pserv}
				onClick={() => {
					const newState: Switches = {
						...state,
						pserv: !state.pserv,
					};

					setState(newState);
					setSwitches(newState);
				}}
			/>
			<div>hack</div>
			<input
				type="checkbox"
				checked={state.hack}
				onClick={() => {
					const newState: Switches = {
						...state,
						hack: !state.hack,
					};

					setState(newState);
					setSwitches(newState);
				}}
			/>
			<div>gang</div>
			<input
				type="checkbox"
				checked={state.gang}
				onClick={() => {
					const newState: Switches = {
						...state,
						gang: !state.gang,
					};

					setState(newState);
					setSwitches(newState);
				}}
			/>
			<div>cct</div>
			<input
				type="checkbox"
				checked={state.cct}
				onClick={() => {
					const newState: Switches = {
						...state,
						cct: !state.cct,
					};

					setState(newState);
					setSwitches(newState);
				}}
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
		target: initialTarget(),
	};
	const setSwitches = (switches: Switches) => {
		state.switches = switches;
	};

	const actions: [() => boolean, () => void | Promise<void>][] = [
		[
			() => state.switches.pserv,
			() => {
				addPserv(ns, state.target.name);
				upgradePserv(ns, state.target.name);
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

	const modal = createModal();
	modal.setTitle("bot controls");
	modal.render(<Controller setSwitches={setSwitches} />);

	modal.onClose(() => {
		ns.exit();
	});
	ns.atExit(() => {
		modal.close();
	});

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
