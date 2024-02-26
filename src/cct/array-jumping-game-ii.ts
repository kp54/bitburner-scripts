/*
Array Jumping Game II
You are attempting to solve a Coding Contract. You have 3 tries remaining, after which the contract will self-destruct.


You are given the following array of integers:

1,2,0,1,4,7,4,2,2,2,4,0,3,3,3,6,0,4,3,3,0,2

Each element in the array represents your MAXIMUM jump length at that position. This means that if you are at position i and your maximum jump length is n, you can jump to any position from i to i+n.

Assuming you are initially positioned at the start of the array, determine the minimum number of jumps to reach the end of the array.

If it's impossible to reach the end, then the answer should be 0.
*/

import { NS } from "@ns";

export const arrayJumpingGameII = (input: number[]) => {
  const reach = input.map((_) => 1000);
  reach[0] = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j <= input[i] && i + j < input.length; j++) {
      reach[i + j] = Math.min(reach[i + j], reach[i] + 1);
    }
  }

  if (reach[input.length - 1] === 1000) {
    return 0;
  }

  return reach[input.length - 1];
};

export const main = (ns: NS) => {
  ns.tprint(
    arrayJumpingGameII([
      1, 2, 0, 1, 4, 7, 4, 2, 2, 2, 4, 0, 3, 3, 3, 6, 0, 4, 3, 3, 0, 2,
    ]),
  );
};
