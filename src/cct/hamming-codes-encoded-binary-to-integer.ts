/*
HammingCodes: Encoded Binary to Integer
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following encoded binary string:
'11101000100000010010001001000100'

Treat it as an extended Hamming code with 1 'possible' error at a random index.
Find the 'possible' wrong bit, fix it and extract the decimal value, which is hidden inside the string.

Note: The length of the binary string is dynamic, but its encoding/decoding follows Hamming's 'rule'
Note 2: Index 0 is an 'overall' parity bit. Watch the Hamming code video from 3Blue1Brown for more information
Note 3: There's a ~55% chance for an altered Bit. So... MAYBE there is an altered Bit 😉
Note: The endianness of the encoded decimal value is reversed in relation to the endianness of the Hamming code. Where the Hamming code is expressed as little-endian (LSB at index 0), the decimal value encoded in it is expressed as big-endian (MSB at index 0).
Extra note for automation: return the decimal value as a string
*/

export const hammingCodes_EncodedBinaryToInteger = (input: string) => {
	const bits = [...input].map((x) => Number(x));
	const parity = bits.reduce((acc, x) => acc ^ x, 0);
	const syndrome = bits.reduce((acc, x, i) => (x !== 0 ? acc ^ i : acc), 0);

	if (parity === 0 && syndrome !== 0) {
		// there are 2 errors!
		throw new Error();
	}

	if (parity === 1 && syndrome !== 0) {
		bits[syndrome] = bits[syndrome] !== 0 ? 0 : 1;
	}

	const data = bits.filter((_, i) => i !== 0 && Math.log2(i) % 1 !== 0);
	return Number.parseInt(String(data.join("")), 2);
};
