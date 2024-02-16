/*
Total Ways to Sum II
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


How many different distinct ways can the number 110 be written as a sum of integers contained in the set:

[1,5,6,8,9,10,11,13,15]?

You may use each integer in the set zero or more times.
*/

import { NS } from "@ns";

const ARR = [1, 5, 6, 8, 9, 10, 11, 13, 15];

const sum = (arr: number[], picks: number) => {
  let shift = 0;
  let result = 0;
  let mask = 1;

  while (mask <= picks) {
    if ((picks & mask) !== 0) {
      result += arr[shift];
    }

    shift += 1;
    mask = 1 << shift;
  }

  return result;
};

export const main = (ns: NS) => {
  let ways = 0;

  for (let i = 0; i < 2 << ARR.length; i++) {
    if (sum(ARR, i) === 110) {
      ways += 1;
    }
  }

  ns.tprint(ways);
};
