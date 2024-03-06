/*
Subarray with Maximum Sum
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.


Given the following integer array, find the contiguous subarray (containing at least one number) which has the largest sum and return that sum. 'Sum' refers to the sum of all the numbers in the subarray.
-1,6,-10,5,1,-9,-2,-2,10,4,-4,-5,2,-6,9,0,7,8,-4,-8,4,10,8,4,0,7,-10,10,-5,-1,-5
*/

export const subarrayWithMaximumSum = (input: number[]) => {
	let max = 0;
	for (let i = 0; i < input.length; i++) {
		let sum = 0;
		for (let j = i; j < input.length; j++) {
			sum += input[j];
			max = Math.max(sum, max);
		}
	}
	return max;
};
