/*
Array Jumping Game
You are attempting to solve a Coding Contract. You have 1 tries remaining, after which the contract will self-destruct.

You are given the following array of integers:

7,0,1,9,0,10,1,0,10,2,7,5,0

Each element in the array represents your MAXIMUM jump length at that position. This means that if you are at position i and your maximum jump length is n, you can jump to any position from i to i+n.

Assuming you are initially positioned at the start of the array, determine whether you are able to reach the last index.

Your answer should be submitted as 1 or 0, representing true and false respectively
*/

import { NS } from "@ns";

const solve = (arr: number[]) => {
  const reachable = new Array(arr.length).fill(false);
  reachable[0] = true;
  for (let i = 0; i < arr.length; i++) {
    if (reachable[i] === false) {
      continue;
    }

    for (let j = 0; j < arr[i]; j++) {
      if (arr.length <= j) {
        break;
      }

      reachable[i + j] = true;
    }
  }

  return reachable[arr.length - 1];
};

export const main = (ns: NS) => {
  const arr = [7, 0, 1, 9, 0, 10, 1, 0, 10, 2, 7, 5, 0];
  ns.tprint(solve(arr));
};
