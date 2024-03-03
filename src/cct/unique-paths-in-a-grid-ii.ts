/*
Unique Paths in a Grid II
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


You are located in the top-left corner of the following grid:

0,0,0,
0,0,0,
0,0,0,
0,0,0,
0,0,0,
0,0,0,
1,0,0,

You are trying reach the bottom-right corner of the grid, but you can only move down or right on each step. Furthermore, there are obstacles on the grid that you cannot move onto. These obstacles are denoted by '1', while empty spaces are denoted by 0.

Determine how many unique paths there are from start to finish.

NOTE: The data returned for this contract is an 2D array of numbers representing the grid.
*/

import { NS } from "@ns";

export const uniquePathsInAGridII = (input: number[][]) => {
  const map: number[][] = [
    [0, ...input[0].map((_) => 0)],
    ...input.map((row) => [0, ...row.map((x) => (x === 1 ? -1 : 0))]),
  ];

  const height = map.length;
  const width = map[0].length;

  map[1][0] = 1;

  for (let i = 1; i < height; i++) {
    for (let j = 1; j < width; j++) {
      if (map[i][j] === -1) {
        map[i][j] = 0;
        continue;
      }

      map[i][j] = map[i - 1][j] + map[i][j - 1];
    }
  }

  console.log(map);

  return map[height - 1][width - 1];
};

export const main = (ns: NS) => {
  uniquePathsInAGridII([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
  ]);
};
