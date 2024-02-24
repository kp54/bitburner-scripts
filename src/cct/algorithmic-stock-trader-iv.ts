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

const split = (values: number[], sep: number) => {
  if (sep === 0) {
    return [[values]];
  }

  const results = new Array<Array<Array<number>>>();
  for (let i = 2; i <= values.length - 2 * sep; i++) {
    const head = values.slice(0, i);
    const rest = values.slice(i, values.length);
    const tails = split(rest, sep - 1);
    for (const tail of tails) {
      results.push([head, ...tail]);
    }
  }

  return results;
};

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

export const algorithmicStockTraderIv = (input: [number, number[]]) => {
  const [trans, prices] = input;
  let max = 0;
  for (let i = 0; i < trans; i++) {
    const patterns = split(prices, i);
    for (const segments of patterns) {
      const score = segments.reduce((acc, x) => acc + find(x), 0);
      if (max < score) {
        max = score;
      }
    }
  }
  return max;
};

export const main = (ns: NS) => {
  ns.tprint(
    algorithmicStockTraderIv([
      6,
      [
        101, 128, 163, 186, 13, 11, 143, 67, 133, 168, 39, 175, 37, 176, 74,
        102, 84, 11, 198, 175, 170, 12, 186, 105, 91, 170, 105, 2, 33, 105, 33,
        13, 80, 166, 97, 151, 157, 191, 81,
      ],
    ]),
  );
};
