/*
Merge Overlapping Intervals
You are attempting to solve a Coding Contract. You have 15 tries remaining, after which the contract will self-destruct.


Given the following array of arrays of numbers representing a list of intervals, merge all overlapping intervals.

[[13,14],[12,19],[18,27],[2,6],[8,11],[14,19],[25,30],[15,18],[2,7],[13,18]]

Example:

[[1, 3], [8, 10], [2, 6], [10, 16]]

would merge into [[1, 6], [8, 16]].

The intervals must be returned in ASCENDING order. You can assume that in an interval, the first number will always be smaller than the second.
*/

export const mergeOverlappingIntervals = (input: [number, number][]) => {
  const max = Math.max(...input.map(([start, stop]) => stop));
  const arr = new Array(max).fill(0);

  for (const [start, stop] of input) {
    arr[start - 1] += 1;
    arr[stop - 1] -= 1;
  }

  let current = 0;
  for (let i = 0; i < max; i++) {
    current += arr[i];
    arr[i] = current;
  }

  const merged = new Array<[number, number]>();
  let start: number | null = null;
  for (let i = 0; i < max; i++) {
    if (start === null && arr[i] !== 0) {
      start = i;
    }

    if (start !== null && arr[i] === 0) {
      merged.push([start + 1, i + 1]);
      start = null;
    }
  }

  return merged;
};
