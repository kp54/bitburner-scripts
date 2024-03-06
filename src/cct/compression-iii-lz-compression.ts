/*
Compression III: LZ Compression
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Lempel-Ziv (LZ) compression is a data compression technique which encodes data using references to earlier parts of the data. In this variant of LZ, data is encoded in two types of chunk. Each chunk begins with a length L, encoded as a single ASCII digit from 1 to 9, followed by the chunk data, which is either:

1. Exactly L characters, which are to be copied directly into the uncompressed data.
2. A reference to an earlier part of the uncompressed data. To do this, the length is followed by a second ASCII digit X: each of the L output characters is a copy of the character X places before it in the uncompressed data.

For both chunk types, a length of 0 instead means the chunk ends immediately, and the next character is the start of a new chunk. The two chunk types alternate, starting with type 1, and the final chunk may be of either type.

You are given the following input string:
    Atz7Jt2H2H2H2H2H2HowH2H266HowH2HciwkwkwkwkwkwkwkwkwkDkNLSnkNLSnkNLSNLSnk
Encode it using Lempel-Ziv encoding with the minimum possible output length.

Examples (some have other possible encodings of minimal length):
    abracadabra     ->  7abracad47
    mississippi     ->  4miss433ppi
    aAAaAAaAaAA     ->  3aAA53035
    2718281828      ->  627182844
    abcdefghijk     ->  9abcdefghi02jk
    aaaaaaaaaaaa    ->  3aaa91
    aaaaaaaaaaaaa   ->  1a91031
    aaaaaaaaaaaaaa  ->  1a91041
*/

import { NS } from "@ns";

const findMatch = (line: string, head: number) => {
	const start = head - 9;
	const stop = head;

	let maxPos = 0;
	let maxLen = 0;

	for (let i = start; i < stop; i++) {
		let len = 0;
		for (let j = 0; j < 9; j++) {
			if (line[head + j] !== line[i + j]) {
				break;
			}
			len += 1;
		}

		if (maxLen <= len) {
			maxPos = i;
			maxLen = len;
		}
	}

	if (maxLen < 3) {
		return [0, 0];
	}

	return [maxPos, maxLen];
};

export const compressionIII_LzCompression = (input: string) => {
	const line = `\0\0\0\0\0\0\0\0\0${input}\0\0\0\0\0\0\0\0\0`;

	const segments = new Array<string>();
	let lastMatch = 9;
	let i = 9;
	while (i < input.length + 9) {
		const [pos, len] = findMatch(line, i);
		if (len !== 0) {
			segments.push(`L:${line.slice(lastMatch, i)}`);
			segments.push(`R:${len}${i - pos}`);
			lastMatch = i + len;
			i += len;
		} else {
			i += 1;
		}
	}

	if (lastMatch !== i) {
		segments.push(`L:${line.slice(lastMatch, i)}`);
	}

	const result = new Array<string>();
	while (true) {
		const seg = segments.shift();
		if (seg === undefined) {
			break;
		}

		if (seg.startsWith("R:")) {
			result.push(seg.slice(2, seg.length));
		}

		if (seg.startsWith("L:")) {
			if (seg.length === 2) {
				result.push("0");
			} else {
				const literals = new Array<string>();
				for (let i = 2; i < seg.length; i += 9) {
					const lit = seg.slice(i, i + 9);
					literals.push(`${lit.length}${lit}`);
				}
				result.push(literals.join("0"));
			}
		}
	}

	return result.join("");
};

export const main = (ns: NS) => {
	ns.tprint(
		compressionIII_LzCompression(
			"N4v24v24v24v25v2asts5dNpry8m1y8m1y8m1y8m1My8m1M1My8MyjmB6REImBPmJ1J1J1",
		),
	);
};
