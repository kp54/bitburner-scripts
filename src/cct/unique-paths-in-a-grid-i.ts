/*
Unique Paths in a Grid I
You are attempting to solve a Coding Contract. You have 7 tries remaining, after which the contract will self-destruct.


You are in a grid with 4 rows and 14 columns, and you are positioned in the top-left corner of that grid.
You are trying to reach the bottom-right corner of the grid, but you can only move down or right on each step.
Determine how many unique paths there are from start to finish.

NOTE: The data returned for this contract is an array with the number of rows and columns:

[4, 14]
*/

import { NS } from "@ns";

const factorial = (n: number) => {
	let x = 1;
	for (let i = 1; i <= n; i++) {
		x *= i;
	}
	return x;
};

export const uniquePathsInAGridI = (input: [number, number]) => {
	const [rows, cols] = input;
	return factorial(rows + cols - 2) / factorial(rows - 1) / factorial(cols - 1);
};

export const main = (ns: NS) => {
	ns.tprint(uniquePathsInAGridI([4, 14]));
};
