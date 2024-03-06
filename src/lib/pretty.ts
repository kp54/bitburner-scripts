export const tabulate = (table: string[][], header?: string[]) => {
	const rep = (char: string, len: number) => new Array(len).fill(char).join("");

	let maxRowLength = 0;
	const cellWidths = [0];
	for (const row of [header ?? [], ...table]) {
		maxRowLength = Math.max(maxRowLength, row.length);
		for (let i = 0; i < maxRowLength; i++) {
			cellWidths[i] = Math.max(cellWidths[i] ?? 0, (row[i] ?? "").length);
		}
	}

	const tableWidth =
		cellWidths.reduce((acc, x) => acc + x) + // field
		(cellWidths.length - 1) * 3 + // delim
		4; // wall
	const horizontal = rep("-", tableWidth);

	const lines = new Array<string>();
	for (const row of [header ?? [], ...table]) {
		const line = [""];
		for (let i = 0; i < maxRowLength; i++) {
			const width = cellWidths[i];
			const content = row[i] ?? "";
			const padding = rep(" ", width - content.length);
			line.push(`${content}${padding}`);
		}
		line.push("");
		lines.push(line.join(" | ").trim());
	}

	lines.unshift(horizontal);
	lines.push(horizontal);
	if (header !== undefined) {
		lines.splice(2, 0, horizontal);
	}

	return lines.join("\n");
};
