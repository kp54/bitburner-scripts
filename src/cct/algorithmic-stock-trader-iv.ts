/*
Algorithmic Stock Trader IV
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following array with two elements:

[6, [101,128,163,186,13,11,143,67,133,168,39,175,37,176,74,102,84,11,198,175,170,12,186,105,91,170,105,2,33,105,33,13,80,166,97,151,157,191,81]]

The first element is an integer k. The second element is an array of stock prices (which are numbers) where the i-th element represents the stock price on day i.

Determine the maximum possible profit you can earn using at most k transactions. A transaction is defined as buying and then selling one share of the stock. Note that you cannot engage in multiple transactions at once. In other words, you must sell the stock before you can buy it again.

If no profit can be made, then the answer should be 0.
*/

import { NS } from "@ns";

const find = (
	prices: number[],
	start: number,
	stop: number,
	memo: Map<number, number>,
) => {
	const id = start * 1000 + stop;
	const cache = memo.get(id);
	if (cache !== undefined) {
		return cache;
	}

	let current_max = 0;

	for (let buyAt = start; buyAt < stop - 1; buyAt++) {
		const buy = prices[buyAt];
		for (let sellAt = buyAt + 1; sellAt < stop; sellAt++) {
			const sell = prices[sellAt];
			const score = sell - buy;

			if (current_max < score) {
				current_max = score;
			}
		}
	}

	memo.set(id, current_max);
	return current_max;
};

const solve = (
	prices: number[],
	start: number,
	stop: number,
	sep: number,
	findMemo: Map<number, number>,
) => {
	if (sep === 0) {
		return find(prices, start, stop, findMemo);
	}

	let max = 0;
	for (let i = start + 2; i <= stop - 2 * sep; i++) {
		const score =
			find(prices, start, i, findMemo) +
			solve(prices, i, stop, sep - 1, findMemo);
		if (max < score) {
			max = score;
		}
	}

	return max;
};

export const algorithmicStockTraderIV = (input: [number, number[]]) => {
	const [trans, prices] = input;
	const findMemo = new Map<number, number>();
	let max = 0;
	for (let i = 0; i < trans; i++) {
		const score = solve(prices, 0, prices.length, i, findMemo);
		if (max < score) {
			max = score;
		}
	}
	return max;
};

export const main = (ns: NS) => {
	ns.tprint(
		algorithmicStockTraderIV([
			6,
			[
				101, 128, 163, 186, 13, 11, 143, 67, 133, 168, 39, 175, 37, 176, 74,
				102, 84, 11, 198, 175, 170, 12, 186, 105, 91, 170, 105, 2, 33, 105, 33,
				13, 80, 166, 97, 151, 157, 191, 81,
			],
		]),
	);
};
