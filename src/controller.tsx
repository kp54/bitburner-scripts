import { NS } from "@ns";
import { createModal } from "/lib/modal";
import React from "/lib/react";

export const main = async (ns: NS) => {
	const modal = createModal();
	modal.setTitle("bot controls");
	modal.render(
		<>
			<div
				style={{
					display: "grid",
					gridTemplateColumns: "1fr 100px",
					alignItems: "center",
					gap: "0.5em",
				}}
			>
				<div>foo</div>
				<button
					type="button"
					onClick={() =>
						queue.push(() => {
							ns.tprint("bar");
						})
					}
				>
					bar
				</button>
				<div>baz</div>
				<button type="button">qux</button>
			</div>
		</>,
	);

	modal.onClose(() => {
		ns.exit();
	});
	ns.atExit(() => {
		modal.close();
	});

	const queue = new Array<() => unknown>();

	while (true) {
		const tasks = queue.splice(0);
		for (const task of tasks) {
			await task();
		}

		await ns.asleep(100);
	}
};
