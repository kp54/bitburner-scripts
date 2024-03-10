/*
Compression II: LZ Decompression
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Lempel-Ziv (LZ) compression is a data compression technique which encodes data using references to earlier parts of the data. In this variant of LZ, data is encoded in two types of chunk. Each chunk begins with a length L, encoded as a single ASCII digit from 1 to 9, followed by the chunk data, which is either:

1. Exactly L characters, which are to be copied directly into the uncompressed data.
2. A reference to an earlier part of the uncompressed data. To do this, the length is followed by a second ASCII digit X: each of the L output characters is a copy of the character X places before it in the uncompressed data.

For both chunk types, a length of 0 instead means the chunk ends immediately, and the next character is the start of a new chunk. The two chunk types alternate, starting with type 1, and the final chunk may be of either type.

You are given the following LZ-encoded string:
    1N519UYpAxKJ3Y09KFE1ow1G602Yf999ZJ6Y6iUIK57064
Decode it and output the original string.

Example: decoding '5aaabb450723abb' chunk-by-chunk
    5aaabb           ->  aaabb
    5aaabb45         ->  aaabbaaab
    5aaabb450        ->  aaabbaaab
    5aaabb45072      ->  aaabbaaababababa
    5aaabb450723abb  ->  aaabbaaababababaabb
*/

export const compressionII_LZDecompression = (input: string) => {
	const code = [...input];
	let mode = 0;
	let i = 0;
	const result = new Array<string>();

	while (i < code.length) {
		if (code[i] === "0") {
			i += 1;
			mode = (mode + 1) % 2;
			continue;
		}

		if (mode === 0) {
			const len = Number(code[i]);
			const head = i + 1;
			result.push(...code.slice(head, head + len));
			i += len + 1;
		}

		if (mode === 1) {
			const len = Number(code[i]);
			const offset = Number(code[i + 1]);
			const tail = result.length;
			for (let j = 0; j < len; j++) {
				result.push(result[tail - offset + j]);
			}
			i += 2;
		}

		mode = (mode + 1) % 2;
	}

	return result.join("");
};
