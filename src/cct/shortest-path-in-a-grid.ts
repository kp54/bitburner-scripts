/*
Shortest Path in a Grid
You are attempting to solve a Coding Contract. You have 10 tries remaining, after which the contract will self-destruct.

You are located in the top-left corner of the following grid:

  [[0,1,0,0,0,0,1,1,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,1,1,1],
   [0,0,0,0,1,0,0,0,0,0,0,0],
   [1,0,0,0,0,0,0,0,0,1,0,0],
   [0,0,1,0,1,1,0,0,0,1,0,0],
   [0,0,1,0,1,0,0,0,0,0,0,1],
   [1,0,1,0,0,1,0,0,0,0,0,0],
   [1,1,0,0,1,1,1,0,0,1,0,0],
   [0,1,1,1,1,0,0,0,0,0,0,0],
   [0,0,0,1,0,0,1,0,0,0,0,1],
   [1,0,1,0,0,0,0,0,0,0,0,0]]

You are trying to find the shortest path to the bottom-right corner of the grid, but there are obstacles on the grid that you cannot move onto. These obstacles are denoted by '1', while empty spaces are denoted by 0.

Determine the shortest path from start to finish, if one exists. The answer should be given as a string of UDLR characters, indicating the moves along the path

NOTE: If there are multiple equally short paths, any of them is accepted as answer. If there is no path, the answer should be an empty string.
NOTE: The data returned for this contract is an 2D array of numbers representing the grid.

Examples:

    [[0,1,0,0,0],
     [0,0,0,1,0]]

Answer: 'DRRURRD'

    [[0,1],
     [1,0]]

Answer: ''
*/

import { NS } from "@ns";

export const shortestPathInAGrid = (map: number[][]) => {
  const goal = {
    y: map.length,
    x: map[0].length,
  };

  map.unshift(new Array(map[0].length).fill(1));
  map.push(new Array(map[0].length).fill(1));
  for (const x of map) {
    x.unshift(1);
    x.push(1);
  }

  const queue = [{ y: 1, x: 1, p: "" }];
  const visited = new Set<string>();
  while (true) {
    const cur = queue.shift();
    if (cur === undefined) {
      return "";
    }

    const id = `${cur.x}-${cur.y}`;
    if (visited.has(id)) {
      continue;
    }
    visited.add(id);

    if (cur.x === goal.x && cur.y === goal.y) {
      return cur.p;
    }

    if (map[cur.y][cur.x - 1] === 0) {
      queue.push({
        x: cur.x - 1,
        y: cur.y,
        p: `${cur.p}L`,
      });
    }

    if (map[cur.y][cur.x + 1] === 0) {
      queue.push({
        x: cur.x + 1,
        y: cur.y,
        p: `${cur.p}R`,
      });
    }

    if (map[cur.y - 1][cur.x] === 0) {
      queue.push({
        x: cur.x,
        y: cur.y - 1,
        p: `${cur.p}U`,
      });
    }

    if (map[cur.y + 1][cur.x] === 0) {
      queue.push({
        x: cur.x,
        y: cur.y + 1,
        p: `${cur.p}D`,
      });
    }
  }
};

export const main = (ns: NS) => {
  ns.tprint(
    shortestPathInAGrid([
      [0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0],
      [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]),
  );
};
