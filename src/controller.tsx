import { NS } from "@ns";
import { createModal } from "/lib/modal";
import React from "/lib/react";

export const main = (ns: NS) => {
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
				<button type="button">bar</button>
				<div>baz</div>
				<button type="button">qux</button>
			</div>
		</>,
	);
};
