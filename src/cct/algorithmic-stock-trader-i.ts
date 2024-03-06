/*
Algorithmic Stock Trader I
You are attempting to solve a Coding Contract. You have 5 tries remaining, after which the contract will self-destruct.


You are given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i:

193,88,125

Determine the maximum possible profit you can earn using at most one transaction (i.e. you can only buy and sell the stock once).
If no profit can be made then the answer should be 0. Note that you have to buy the stock before you can sell it
*/

import { NS } from "@ns";

export const algorithmicStockTraderI = (input: number[]) => {
	let max = 0;

	for (let i = 0; i < input.length - 1; i++) {
		for (let j = i + 1; j < input.length; j++) {
			max = Math.max(max, input[j] - input[i]);
		}
	}

	return max;
};

export const main = (ns: NS) => {
	ns.tprint(algorithmicStockTraderI([193, 88, 125]));
};
