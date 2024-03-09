/*
Minimum Path Sum in a Triangle
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Given a triangle, find the minimum path sum from top to bottom. In each step of the path, you may only move to adjacent numbers in the row below. The triangle is represented as a 2D array of numbers:

[
            [6],
           [8,2],
          [6,5,1],
         [2,5,4,9],
        [9,7,2,1,9],
       [4,2,1,9,6,3],
      [2,2,4,7,8,6,5],
     [7,9,1,6,9,4,5,3],
    [3,8,7,7,4,2,7,4,9],
   [8,6,3,7,3,3,9,7,9,9],
  [1,7,9,1,9,1,4,5,3,2,7]
]

Example: If you are given the following triangle:

[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]

The minimum path sum is 11 (2 -> 3 -> 5 -> 1).
*/

export const minimumPathSumInATriangle = (input: number[][]) => {
	const costs = new Array<number[]>();
	costs.push(input[0]);

	for (let i = 0; i < input.length - 1; i++) {
		const cost = new Array<number>(input[i + 1].length).fill(Infinity);
		for (let j = 0; j < input[i].length; j++) {
			cost[j] = Math.min(cost[j], costs[i][j] + input[i + 1][j]);
			cost[j + 1] = Math.min(cost[j + 1], costs[i][j] + input[i + 1][j + 1]);
		}
		costs.push(cost);
	}
	return Math.min(...costs[costs.length - 1]);
};
