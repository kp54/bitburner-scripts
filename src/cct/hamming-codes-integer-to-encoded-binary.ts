/*
HammingCodes: Integer to Encoded Binary
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following decimal Value:
54983434976434
Convert it to a binary representation and encode it as an 'extended Hamming code'. Eg:
Value 8 is expressed in binary as '1000', which will be encoded with the pattern 'pppdpddd', where p is a parity bit and d a data bit. The encoding of
8 is 11110000. As another example, '10101' (Value 21) will result into (pppdpdddpd) '1001101011'.
The answer should be given as a string containing only 1s and 0s.
NOTE: the endianness of the data bits is reversed in relation to the endianness of the parity bits.
NOTE: The bit at index zero is the overall parity bit, this should be set last.
NOTE 2: You should watch the Hamming Code video from 3Blue1Brown, which explains the 'rule' of encoding, including the first index parity bit mentioned in the previous note.

Extra rule for encoding:
There should be no leading zeros in the 'data bit' section
*/

export const hammingCodes_IntegerToEncodedBinary = (input: number) => {
	const data = [...input.toString(2)].map((x) => Number(x));
	const bits = [];

	let i = 0;
	let j = 0;
	while (i < data.length) {
		if (j === 0 || Math.log2(j) % 1 === 0) {
			bits.push(0);
		} else {
			bits.push(data[i]);
			i += 1;
		}

		j += 1;
	}

	const syndrome = bits.reduce((acc, x, i) => (x !== 0 ? acc ^ i : acc), 0);
	i = 0;
	while (true) {
		const x = 1 << i;
		if (bits.length < x) {
			break;
		}

		if ((syndrome & x) !== 0) {
			bits[x] = 1;
		}

		i += 1;
	}

	const parity = bits.reduce((acc, x) => acc ^ x, 0);
	if (parity !== 0) {
		bits[0] = 1;
	}

	return bits.join("");
};
