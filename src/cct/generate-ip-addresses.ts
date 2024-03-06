/*
Generate IP Addresses
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Given the following string containing only digits, return an array with all possible valid IP address combinations that can be created from the string:

20320722422

Note that an octet cannot begin with a '0' unless the number itself is actually 0. For example, '192.168.010.1' is not a valid IP.

Examples:

25525511135 -> ["255.255.11.135", "255.255.111.35"]
1938718066 -> ["193.87.180.66"]
*/

import { NS } from "@ns";

const isValid = (octet: string) => {
	if (octet !== "0" && octet.startsWith("0")) {
		return false;
	}

	const val = Number(octet);
	if (255 < val) {
		return false;
	}

	return true;
};

export const generateIpAddresses = (input: string) => {
	const results = new Array<string>();

	for (let i = 1; i < input.length - 2; i++) {
		for (let j = i + 1; j < input.length - 1; j++) {
			for (let k = j + 1; k < input.length; k++) {
				const octet1 = input.slice(0, i);
				const octet2 = input.slice(i, j);
				const octet3 = input.slice(j, k);
				const octet4 = input.slice(k, input.length);

				if (
					isValid(octet1) &&
					isValid(octet2) &&
					isValid(octet3) &&
					isValid(octet4)
				) {
					results.push(`${octet1}.${octet2}.${octet3}.${octet4}`);
				}
			}
		}
	}

	return results;
};

export const main = (ns: NS) => {
	ns.tprint(generateIpAddresses("20320722422"));
};
