/*
Total Ways to Sum II
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


How many different distinct ways can the number 13 be written as a sum of integers contained in the set:

[1,2,3,5,7,9,10,11,13]?

You may use each integer in the set zero or more times.
*/

import { NS } from "@ns";

const rec = (num: number, choices: number[], memo: Map<string, number>) => {
	const x: number | undefined = choices[0];
	if (x === undefined || num < x) {
		return 0;
	}

	const id = `${num}-${x}`;
	const cache = memo.get(id);
	if (cache !== undefined) {
		return cache;
	}

	let sum = 0;
	let i = 0;
	for (; i < num; i += x) {
		const next = choices.slice(1);
		sum += rec(num - i, next, memo);
	}

	if (i === num) {
		sum += 1;
	}

	memo.set(id, sum);
	return sum;
};

export const totalWaysToSumII = (input: [number, number[]]) => {
	const [n, choices] = input;
	const memo = new Map<string, number>();
	return rec(n, choices, memo);
};

export const main = (ns: NS) => {
	ns.tprint(totalWaysToSumII([13, [1, 2, 3, 5, 7, 9, 10, 11, 13]]));
};
