/*
Total Ways to Sum
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.

It is possible write four as a sum in exactly four different ways:

    3 + 1
    2 + 2
    2 + 1 + 1
    1 + 1 + 1 + 1

How many different distinct ways can the number 51 be written as a sum of at least two positive integers?
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

export const totalWaysToSum = (num: number) => {
	const choices = new Array(num - 1).fill(0).map((_, i) => i + 1);
	const memo = new Map<string, number>();
	return rec(num, choices, memo);
};

export const main = (ns: NS) => {
	ns.tprint(totalWaysToSum(51));
};
