/*
Algorithmic Stock Trader III
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are given the following array of stock prices (which are numbers) where the i-th element represents the stock price on day i:

110,99,13,193,52,163,163,84,81,181,136,26,84,156,195,98,118,16,131,165,111,2,71

Determine the maximum possible profit you can earn using at most two transactions. A transaction is defined as buying and then selling one share of the stock. Note that you cannot engage in multiple transactions at once. In other words, you must sell the stock before you buy it again.

If no profit can be made, then the answer should be 0
*/

import { NS } from "@ns";

const find = (prices: number[]) => {
  let current_max = 0;

  for (let buyAt = 0; buyAt < prices.length - 1; buyAt++) {
    const buy = prices[buyAt];
    for (let sellAt = buyAt + 1; sellAt < prices.length; sellAt++) {
      const sell = prices[sellAt];
      const score = sell - buy;

      if (current_max < score) {
        current_max = score;
      }
    }
  }

  return current_max;
};

export const algorithmicStockTraderIII = (prices: number[]) => {
  let current_max = find(prices);

  for (let i = 2; i < prices.length - 2; i++) {
    const left = prices.slice(0, i);
    const right = prices.slice(i, prices.length);

    const score = find(left) + find(right);
    if (current_max < score) {
      current_max = score;
    }
  }
};

export const main = (ns: NS) => {
  const prices = [
    110, 99, 13, 193, 52, 163, 163, 84, 81, 181, 136, 26, 84, 156, 195, 98, 118,
    16, 131, 165, 111, 2, 71,
  ];

  ns.tprint(algorithmicStockTraderIII(prices));
};
